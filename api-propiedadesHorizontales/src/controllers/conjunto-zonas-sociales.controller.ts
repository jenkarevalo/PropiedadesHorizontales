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
  ZonasSociales,
} from '../models';
import {ConjuntoRepository} from '../repositories';

export class ConjuntoZonasSocialesController {
  constructor(
    @repository(ConjuntoRepository) protected conjuntoRepository: ConjuntoRepository,
  ) { }

  @get('/conjuntos/{id}/zonas-sociales', {
    responses: {
      '200': {
        description: 'Array of Conjunto has many ZonasSociales',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ZonasSociales)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ZonasSociales>,
  ): Promise<ZonasSociales[]> {
    return this.conjuntoRepository.zonasSociales(id).find(filter);
  }

  @post('/conjuntos/{id}/zonas-sociales', {
    responses: {
      '200': {
        description: 'Conjunto model instance',
        content: {'application/json': {schema: getModelSchemaRef(ZonasSociales)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Conjunto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ZonasSociales, {
            title: 'NewZonasSocialesInConjunto',
            exclude: ['id'],
            optional: ['conjuntoId']
          }),
        },
      },
    }) zonasSociales: Omit<ZonasSociales, 'id'>,
  ): Promise<ZonasSociales> {
    return this.conjuntoRepository.zonasSociales(id).create(zonasSociales);
  }

  @patch('/conjuntos/{id}/zonas-sociales', {
    responses: {
      '200': {
        description: 'Conjunto.ZonasSociales PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ZonasSociales, {partial: true}),
        },
      },
    })
    zonasSociales: Partial<ZonasSociales>,
    @param.query.object('where', getWhereSchemaFor(ZonasSociales)) where?: Where<ZonasSociales>,
  ): Promise<Count> {
    return this.conjuntoRepository.zonasSociales(id).patch(zonasSociales, where);
  }

  @del('/conjuntos/{id}/zonas-sociales', {
    responses: {
      '200': {
        description: 'Conjunto.ZonasSociales DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ZonasSociales)) where?: Where<ZonasSociales>,
  ): Promise<Count> {
    return this.conjuntoRepository.zonasSociales(id).delete(where);
  }
}
