import {Entity, model, property} from '@loopback/repository';

@model()
export class Conjunto extends Entity {
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
  nit: string;

  @property({
    type: 'string',
    required: true,
  })
  cuentaBancaria: string;

  @property({
    type: 'string',
    required: true,
  })
  banco: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreAdministrador: string;

  @property({
    type: 'number',
    required: true,
  })
  interesXMora: number;

  @property({
    type: 'string',
    required: true,
  })
  inicioNumeroFactura: string;

  @property({
    type: 'number',
    required: true,
  })
  presupuestoActual: number;


  constructor(data?: Partial<Conjunto>) {
    super(data);
  }
}

export interface ConjuntoRelations {
  // describe navigational properties here
}

export type ConjuntoWithRelations = Conjunto & ConjuntoRelations;
