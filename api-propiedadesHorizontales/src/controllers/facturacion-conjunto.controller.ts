import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Facturacion,
  Conjunto,
} from '../models';
import {FacturacionRepository} from '../repositories';

export class FacturacionConjuntoController {
  constructor(
    @repository(FacturacionRepository)
    public facturacionRepository: FacturacionRepository,
  ) { }

  @get('/facturacions/{id}/conjunto', {
    responses: {
      '200': {
        description: 'Conjunto belonging to Facturacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Conjunto)},
          },
        },
      },
    },
  })
  async getConjunto(
    @param.path.string('id') id: typeof Facturacion.prototype.id,
  ): Promise<Conjunto> {
    return this.facturacionRepository.conjunto(id);
  }
}
