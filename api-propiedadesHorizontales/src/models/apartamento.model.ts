import {Entity, model, property} from '@loopback/repository';

@model()
export class Apartamento extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  numero: string;


  constructor(data?: Partial<Apartamento>) {
    super(data);
  }
}

export interface ApartamentoRelations {
  // describe navigational properties here
}

export type ApartamentoWithRelations = Apartamento & ApartamentoRelations;
