import {Entity, model, property, hasMany} from '@loopback/repository';
import {ZonasSociales} from './zonas-sociales.model';
import {Facturacion} from './facturacion.model';
import {Torre} from './torre.model';
import {Propietario} from './propietario.model';
import {Habitante} from './habitante.model';

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

  @property({
    type: 'string',
    required: false, 
   })
   email: string;

  @property({
    type: 'string',
    required: false, 
   })
   clave:'string'

   

  @hasMany(() => ZonasSociales)
  zonasSociales: ZonasSociales[];

  @hasMany(() => Facturacion)
  facturacions: Facturacion[];

  @hasMany(() => Torre)
  torres: Torre[];

  @hasMany(() => Propietario)
  propietarios: Propietario[];

  @hasMany(() => Habitante)
  habitantes: Habitante[];

  constructor(data?: Partial<Conjunto>) {
    super(data);
  }
}

export interface ConjuntoRelations {
  // describe navigational properties here
}

export type ConjuntoWithRelations = Conjunto & ConjuntoRelations;
