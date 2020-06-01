import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { ApolloError } from 'apollo-server';

import { Planet } from '../entity/Planet';
import IPlanet from '../entity/IPlanet';

@Resolver(() => Planet)
export default class PlanetResolver {
  @Query(() => [Planet], { nullable: true })
  async suitablePlanets(): Promise<Planet[]> {
    const planets = await Planet.find();

    return planets;
  }

  @Mutation(() => Planet)
  async installStation(@Arg('id') id: number): Promise<IPlanet | ApolloError> {
    const installPlanet = await Planet.findOne({ id });

    if (!installPlanet) {
      return new ApolloError('Planet not found. :/');
    }

    if (installPlanet.hasStation === true) {
      return new ApolloError('Houston. This planet already has station. :/');
    }

    installPlanet.hasStation = true;

    await Planet.save(installPlanet);

    return installPlanet;
  }
}
