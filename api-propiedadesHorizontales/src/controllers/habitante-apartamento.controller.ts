import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Habitante,
  Apartamento,
} from '../models';
import {HabitanteRepository} from '../repositories';

export class HabitanteApartamentoController {
  constructor(
    @repository(HabitanteRepository)
    public habitanteRepository: HabitanteRepository,
  ) { }

  @get('/habitantes/{id}/apartamento', {
    responses: {
      '200': {
        description: 'Apartamento belonging to Habitante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Apartamento)},
          },
        },
      },
    },
  })
  async getApartamento(
    @param.path.string('id') id: typeof Habitante.prototype.id,
  ): Promise<Apartamento> {
    return this.habitanteRepository.apartamento(id);
  }
}
