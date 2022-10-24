import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Torre,
  Conjunto,
} from '../models';
import {TorreRepository} from '../repositories';

export class TorreConjuntoController {
  constructor(
    @repository(TorreRepository)
    public torreRepository: TorreRepository,
  ) { }

  @get('/torres/{id}/conjunto', {
    responses: {
      '200': {
        description: 'Conjunto belonging to Torre',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Conjunto)},
          },
        },
      },
    },
  })
  async getConjunto(
    @param.path.string('id') id: typeof Torre.prototype.id,
  ): Promise<Conjunto> {
    return this.torreRepository.conjunto(id);
  }
}
