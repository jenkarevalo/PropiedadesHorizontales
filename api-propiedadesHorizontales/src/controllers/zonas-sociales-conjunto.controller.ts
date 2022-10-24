import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ZonasSociales,
  Conjunto,
} from '../models';
import {ZonasSocialesRepository} from '../repositories';

export class ZonasSocialesConjuntoController {
  constructor(
    @repository(ZonasSocialesRepository)
    public zonasSocialesRepository: ZonasSocialesRepository,
  ) { }

  @get('/zonas-sociales/{id}/conjunto', {
    responses: {
      '200': {
        description: 'Conjunto belonging to ZonasSociales',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Conjunto)},
          },
        },
      },
    },
  })
  async getConjunto(
    @param.path.string('id') id: typeof ZonasSociales.prototype.id,
  ): Promise<Conjunto> {
    return this.zonasSocialesRepository.conjunto(id);
  }
}
