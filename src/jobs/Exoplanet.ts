import axios, { AxiosInstance } from 'axios';
import { getConnection } from 'typeorm';
import { Planet } from '../modules/Planets/entity/Planet';

/**
 * @TODO: Refactor this to work with request queue
 */
export default class Exoplanet {
  private baseURL = 'https://api.arcsecond.io/';

  private API: AxiosInstance;

  constructor() {
    this.API = axios.create({ baseURL: 'https://api.arcsecond.io/' });
  }

  async getExoplanets(): Promise<string> {
    const planetsCount = await Planet.getRepository()
      .createQueryBuilder()
      .select('DISTINCT(`sender_id`)')
      .getCount();

    if (!planetsCount) {
      console.log('Getting new exoplanets...');

      let currentPage = 1;
      const minFetchPages = 10;

      // eslint-disable-next-line prefer-const
      let planets = [];

      const params = {
        page: currentPage,
      };

      while (currentPage <= minFetchPages) {
        // eslint-disable-next-line no-await-in-loop
        await this.API.get('exoplanets', params).then(({ data }) => {
          const requestPlanets = data.results
            .filter(
              (planet) =>
                planet.mass &&
                planet.mass.value >= 25 &&
                planet.mass.unit === 'M_jup',
            )
            .map((planet) => ({
              name: planet.name,
              mass: planet.mass.value,
              hasStation: false,
            }));

          planets.push(...requestPlanets);
        });

        currentPage += 1;
      }

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Planet)
        .values(planets)
        .execute();
    }

    return 'Ok';
  }
}
