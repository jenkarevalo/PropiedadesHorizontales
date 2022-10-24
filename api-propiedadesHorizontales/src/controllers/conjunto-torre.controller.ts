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
  Torre,
} from '../models';
import {ConjuntoRepository} from '../repositories';

export class ConjuntoTorreController {
  constructor(
    @repository(ConjuntoRepository) protected conjuntoRepository: ConjuntoRepository,
  ) { }

  @get('/conjuntos/{id}/torres', {
    responses: {
      '200': {
        description: 'Array of Conjunto has many Torre',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Torre)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Torre>,
  ): Promise<Torre[]> {
    return this.conjuntoRepository.torres(id).find(filter);
  }

  @post('/conjuntos/{id}/torres', {
    responses: {
      '200': {
        description: 'Conjunto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Torre)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Conjunto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Torre, {
            title: 'NewTorreInConjunto',
            exclude: ['id'],
            optional: ['conjuntoId']
          }),
        },
      },
    }) torre: Omit<Torre, 'id'>,
  ): Promise<Torre> {
    return this.conjuntoRepository.torres(id).create(torre);
  }

  @patch('/conjuntos/{id}/torres', {
    responses: {
      '200': {
        description: 'Conjunto.Torre PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Torre, {partial: true}),
        },
      },
    })
    torre: Partial<Torre>,
    @param.query.object('where', getWhereSchemaFor(Torre)) where?: Where<Torre>,
  ): Promise<Count> {
    return this.conjuntoRepository.torres(id).patch(torre, where);
  }

  @del('/conjuntos/{id}/torres', {
    responses: {
      '200': {
        description: 'Conjunto.Torre DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Torre)) where?: Where<Torre>,
  ): Promise<Count> {
    return this.conjuntoRepository.torres(id).delete(where);
  }
}
