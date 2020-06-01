/* eslint-disable import/prefer-default-export */
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ID, ObjectType, Float } from 'type-graphql';

@Entity('planets')
@ObjectType()
export class Planet extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Float)
  @Column({
    type: 'double precision',
    precision: 12,
    scale: 2,
  })
  mass: number;

  @Field(() => Boolean)
  @Column({
    name: 'has_station',
    default: false,
  })
  hasStation: boolean;
}
