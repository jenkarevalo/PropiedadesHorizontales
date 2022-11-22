import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Torre} from './torre.model';
import {Propietario} from './propietario.model';
import {Habitante} from './habitante.model';
import {Factura} from './factura.model';

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

  @belongsTo(() => Torre)
  torreId: string;

  @belongsTo(() => Propietario)
  propietarioId: string;

  @hasMany(() => Habitante)
  habitantes: Habitante[];

  @hasMany(() => Factura)
  facturas: Factura[];

  constructor(data?: Partial<Apartamento>) {
    super(data);
  }
}

export interface ApartamentoRelations {
  // describe navigational properties here
}

export type ApartamentoWithRelations = Apartamento & ApartamentoRelations;
