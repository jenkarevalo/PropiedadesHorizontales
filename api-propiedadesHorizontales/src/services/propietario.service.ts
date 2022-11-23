import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Propietario } from '../models';
import { PropietarioRepository } from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class PropietarioService {
  constructor(
  @repository (PropietarioRepository)
  public propietarioRepository: PropietarioRepository
  ) {}

  getPropietarioPropiedad(documento:string):Promise <Propietario[]> {
   let propietarios = this.propietarioRepository.find({
     include: ['apartamentos'],
     where:{
      documento:documento 
     }
    });
   return propietarios;
  }
}