import {Entity, model, property} from '@loopback/repository';

@model()
export class ZonasSociales extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  topografia: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  costoAlquiler: number;

  @property({
    type: 'date',
    required: true,
  })
  horarioAcceso: string;


  constructor(data?: Partial<ZonasSociales>) {
    super(data);
  }
}

export interface ZonasSocialesRelations {
  // describe navigational properties here
}

export type ZonasSocialesWithRelations = ZonasSociales & ZonasSocialesRelations;
