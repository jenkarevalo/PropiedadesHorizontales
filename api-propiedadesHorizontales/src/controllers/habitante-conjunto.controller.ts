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
  Conjunto,
} from '../models';
import {HabitanteRepository} from '../repositories';

export class HabitanteConjuntoController {
  constructor(
    @repository(HabitanteRepository)
    public habitanteRepository: HabitanteRepository,
  ) { }

  @get('/habitantes/{id}/conjunto', {
    responses: {
      '200': {
        description: 'Conjunto belonging to Habitante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Conjunto)},
          },
        },
      },
    },
  })
  async getConjunto(
    @param.path.string('id') id: typeof Habitante.prototype.id,
  ): Promise<Conjunto> {
    return this.habitanteRepository.conjunto(id);
  }
}
