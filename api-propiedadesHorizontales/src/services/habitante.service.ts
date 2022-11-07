import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Habitante } from '../models';
import { HabitanteRepository } from '../repositories';

@injectable({ scope: BindingScope.TRANSIENT })
export class HabitanteService {
  constructor(
@repository(HabitanteRepository)
  public habitanteRepository: HabitanteRepository
  ) { }

  getHabitanteApto(documento: string): Promise< Habitante[] > {
    let habitantes = this.habitanteRepository.find({
      include: ['apartamento'],
      where: {
        documento: documento
      }
    });
    return habitantes;
  }
}