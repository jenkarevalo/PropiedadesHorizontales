import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { ANY, repository } from '@loopback/repository';
import { Apartamento } from '../models';
import { ApartamentoRepository } from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class ApartamentoService {

  constructor(
    @repository(ApartamentoRepository)
    public apartamentoRepository: ApartamentoRepository
  ) {}

  getApartamentosDisponibles(): Promise<Apartamento[]>{
    let listaApartamentos = this.apartamentoRepository.find({
      include: ['habitantes'],
      where: {
        numero: ''
      }
    });
    return listaApartamentos;
  }
}
