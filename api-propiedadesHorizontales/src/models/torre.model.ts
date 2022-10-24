import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Conjunto} from './conjunto.model';
import {Apartamento} from './apartamento.model';

@model()
export class Torre extends Entity {
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
  descripcion: string;

  @belongsTo(() => Conjunto)
  conjuntoId: string;

  @hasMany(() => Apartamento)
  apartamentos: Apartamento[];

  constructor(data?: Partial<Torre>) {
    super(data);
  }
}

export interface TorreRelations {
  // describe navigational properties here
}

export type TorreWithRelations = Torre & TorreRelations;
