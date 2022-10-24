import {Entity, model, property} from '@loopback/repository';

@model()
export class Habitante extends Entity {
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
  primerNombre: string;

  @property({
    type: 'string',
    required: true,
  })
  segundoNombre: string;

  @property({
    type: 'string',
    required: true,
  })
  primerApellido: string;

  @property({
    type: 'string',
    required: true,
  })
  segundoApellido: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;


  constructor(data?: Partial<Habitante>) {
    super(data);
  }
}

export interface HabitanteRelations {
  // describe navigational properties here
}

export type HabitanteWithRelations = Habitante & HabitanteRelations;
