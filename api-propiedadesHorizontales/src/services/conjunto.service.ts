import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { ConjuntoRepository } from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class ConjuntoService {
  constructor(

  @repository (ConjuntoRepository)
  public conjuntoRespository: ConjuntoRepository
) {}



}
