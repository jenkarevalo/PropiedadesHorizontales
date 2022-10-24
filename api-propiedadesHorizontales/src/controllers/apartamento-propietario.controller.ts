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
  Propietario,
} from '../models';
import {ApartamentoRepository} from '../repositories';

export class ApartamentoPropietarioController {
  constructor(
    @repository(ApartamentoRepository)
    public apartamentoRepository: ApartamentoRepository,
  ) { }

  @get('/apartamentos/{id}/propietario', {
    responses: {
      '200': {
        description: 'Propietario belonging to Apartamento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Propietario)},
          },
        },
      },
    },
  })
  async getPropietario(
    @param.path.string('id') id: typeof Apartamento.prototype.id,
  ): Promise<Propietario> {
    return this.apartamentoRepository.propietario(id);
  }
}
