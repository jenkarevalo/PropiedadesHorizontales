import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Torre } from '../models/torre.model';
import { TorreRepository } from '../repositories/torre.repository';

@injectable({scope: BindingScope.TRANSIENT})
export class TorreService {
  constructor(
    //acceder a la Bds => Repositorios
    @repository(TorreRepository)
    public torreRepository: TorreRepository
  ) {}
  //consulta a la base de datos donde se ve el listado de las torres con un filtro
  getTorresDisponibles(): Promise<Torre[]> {
    let listaTorres= this.torreRepository.find({
      // filtros que se van a necesitar
      where: {
        descripcion: 'En buen estado'
      } 
    });
    return listaTorres;
  }
}
