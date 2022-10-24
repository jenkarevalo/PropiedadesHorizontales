import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Apartamento,
  Torre,
} from '../models';
import {ApartamentoRepository} from '../repositories';

export class ApartamentoTorreController {
  constructor(
    @repository(ApartamentoRepository)
    public apartamentoRepository: ApartamentoRepository,
  ) { }

  @get('/apartamentos/{id}/torre', {
    responses: {
      '200': {
        description: 'Torre belonging to Apartamento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Torre)},
          },
        },
      },
    },
  })
  async getTorre(
    @param.path.string('id') id: typeof Apartamento.prototype.id,
  ): Promise<Torre> {
    return this.apartamentoRepository.torre(id);
  }
}
