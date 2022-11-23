import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Factura,
  Apartamento,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaApartamentoController {
  constructor(
    @repository(FacturaRepository)
    public facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/apartamento', {
    responses: {
      '200': {
        description: 'Apartamento belonging to Factura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Apartamento)},
          },
        },
      },
    },
  })
  async getApartamento(
    @param.path.string('id') id: typeof Factura.prototype.id,
  ): Promise<Apartamento> {
    return this.facturaRepository.apartamento(id);
  }
}
