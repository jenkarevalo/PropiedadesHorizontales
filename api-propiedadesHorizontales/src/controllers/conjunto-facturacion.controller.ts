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
  Conjunto,
  Facturacion,
} from '../models';
import {ConjuntoRepository} from '../repositories';

export class ConjuntoFacturacionController {
  constructor(
    @repository(ConjuntoRepository) protected conjuntoRepository: ConjuntoRepository,
  ) { }

  @get('/conjuntos/{id}/facturacions', {
    responses: {
      '200': {
        description: 'Array of Conjunto has many Facturacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Facturacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Facturacion>,
  ): Promise<Facturacion[]> {
    return this.conjuntoRepository.facturacions(id).find(filter);
  }

  @post('/conjuntos/{id}/facturacions', {
    responses: {
      '200': {
        description: 'Conjunto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Facturacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Conjunto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Facturacion, {
            title: 'NewFacturacionInConjunto',
            exclude: ['id'],
            optional: ['conjuntoId']
          }),
        },
      },
    }) facturacion: Omit<Facturacion, 'id'>,
  ): Promise<Facturacion> {
    return this.conjuntoRepository.facturacions(id).create(facturacion);
  }

  @patch('/conjuntos/{id}/facturacions', {
    responses: {
      '200': {
        description: 'Conjunto.Facturacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Facturacion, {partial: true}),
        },
      },
    })
    facturacion: Partial<Facturacion>,
    @param.query.object('where', getWhereSchemaFor(Facturacion)) where?: Where<Facturacion>,
  ): Promise<Count> {
    return this.conjuntoRepository.facturacions(id).patch(facturacion, where);
  }

  @del('/conjuntos/{id}/facturacions', {
    responses: {
      '200': {
        description: 'Conjunto.Facturacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Facturacion)) where?: Where<Facturacion>,
  ): Promise<Count> {
    return this.conjuntoRepository.facturacions(id).delete(where);
  }
}
