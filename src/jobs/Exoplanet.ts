import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getConnection } from 'typeorm';
import { Planet } from '../modules/Planets/entity/Planet';
import IPlanet from '../modules/Planets/entity/IPlanet';

/**
 * @TODO: Refactor this to work with request queue
 */
export default class Exoplanet {
  private API: AxiosInstance = axios.create({
    baseURL: 'https://api.arcsecond.io/',
  });

  /**
   * Create a list of axios requests, based in pages qty param.
   * */
  private getRequests(pages: number): Promise<AxiosResponse<any>>[] {
    return Array.from({ length: pages }).map((_, i) =>
      this.API.get('exoplanets', { params: { page: i + 1 } }),
    );
  }

  async getExoplanets(): Promise<void> {
    const planetsCount = await Planet.getRepository()
      .createQueryBuilder()
      .select('DISTINCT(`sender_id`)')
      .getCount();

    if (!planetsCount) {
      console.log('Getting new exoplanets...');

      const pages = 10;

      // dispatch promises with axios requests
      const responses = await Promise.all(this.getRequests(pages));

      const planets: IPlanet[] = responses
        .flatMap(({ data }) => data.results)
        .filter(
          (planet) =>
            planet?.mass?.value >= 25 && planet?.mass?.unit === 'M_jup',
        )
        .map((planet) => ({
          name: planet.name,
          mass: planet.mass.value,
          hasStation: false,
        }));

      console.log("Hey! We've got all exoplanets of universe. (⌐■_■)");

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Planet)
        .values(planets)
        .execute();
    }
  }
}
