import {Entity, model, property} from '@loopback/repository';

@model()
export class Facturacion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  notasCredito: number;

  @property({
    type: 'number',
    required: true,
  })
  notasDebito: number;

  @property({
    type: 'number',
    required: true,
  })
  cuotasExtra: number;

  @property({
    type: 'number',
    required: true,
  })
  saldosPendientes: number;


  constructor(data?: Partial<Facturacion>) {
    super(data);
  }
}

export interface FacturacionRelations {
  // describe navigational properties here
}

export type FacturacionWithRelations = Facturacion & FacturacionRelations;
