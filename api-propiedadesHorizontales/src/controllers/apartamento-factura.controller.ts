import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Apartamento,
  Factura,
} from '../models';
import {ApartamentoRepository} from '../repositories';

export class ApartamentoFacturaController {
  constructor(
    @repository(ApartamentoRepository) protected apartamentoRepository: ApartamentoRepository,
  ) { }

  @get('/apartamentos/{id}/facturas', {
    responses: {
      '200': {
        description: 'Array of Apartamento has many Factura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Factura)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Factura>,
  ): Promise<Factura[]> {
    return this.apartamentoRepository.facturas(id).find(filter);
  }

  @post('/apartamentos/{id}/facturas', {
    responses: {
      '200': {
        description: 'Apartamento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Factura)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Apartamento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {
            title: 'NewFacturaInApartamento',
            exclude: ['id'],
            optional: ['apartamentoId']
          }),
        },
      },
    }) factura: Omit<Factura, 'id'>,
  ): Promise<Factura> {
    return this.apartamentoRepository.facturas(id).create(factura);
  }

  @patch('/apartamentos/{id}/facturas', {
    responses: {
      '200': {
        description: 'Apartamento.Factura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {partial: true}),
        },
      },
    })
    factura: Partial<Factura>,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.apartamentoRepository.facturas(id).patch(factura, where);
  }

  @del('/apartamentos/{id}/facturas', {
    responses: {
      '200': {
        description: 'Apartamento.Factura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.apartamentoRepository.facturas(id).delete(where);
  }
}
