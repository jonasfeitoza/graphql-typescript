import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { ApolloError } from 'apollo-server';

import { Planet } from '../entity/Planet';
import IPlanet from '../entity/IPlanet';

@Resolver(() => Planet)
export default class PlanetResolver {
  @Query(() => [Planet], { nullable: true })
  suitablePlanets(): Promise<Planet[]> {
    return Planet.find();
  }

  @Mutation(() => Planet)
  async installStation(@Arg('id') id: number): Promise<IPlanet | ApolloError> {
    const planet = await Planet.findOne({ id });

    if (!planet) {
      return new ApolloError('Planet not found. :/');
    }

    if (planet.hasStation === true) {
      return new ApolloError('Houston. This planet already has station. :/');
    }

    planet.hasStation = true;

    await Planet.save(planet);

    return planet;
  }
}
