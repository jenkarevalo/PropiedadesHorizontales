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
  Habitante,
} from '../models';
import {ConjuntoRepository} from '../repositories';

export class ConjuntoHabitanteController {
  constructor(
    @repository(ConjuntoRepository) protected conjuntoRepository: ConjuntoRepository,
  ) { }

  @get('/conjuntos/{id}/habitantes', {
    responses: {
      '200': {
        description: 'Array of Conjunto has many Habitante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Habitante)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Habitante>,
  ): Promise<Habitante[]> {
    return this.conjuntoRepository.habitantes(id).find(filter);
  }

  @post('/conjuntos/{id}/habitantes', {
    responses: {
      '200': {
        description: 'Conjunto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Habitante)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Conjunto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Habitante, {
            title: 'NewHabitanteInConjunto',
            exclude: ['id'],
            optional: ['conjuntoId']
          }),
        },
      },
    }) habitante: Omit<Habitante, 'id'>,
  ): Promise<Habitante> {
    return this.conjuntoRepository.habitantes(id).create(habitante);
  }

  @patch('/conjuntos/{id}/habitantes', {
    responses: {
      '200': {
        description: 'Conjunto.Habitante PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Habitante, {partial: true}),
        },
      },
    })
    habitante: Partial<Habitante>,
    @param.query.object('where', getWhereSchemaFor(Habitante)) where?: Where<Habitante>,
  ): Promise<Count> {
    return this.conjuntoRepository.habitantes(id).patch(habitante, where);
  }

  @del('/conjuntos/{id}/habitantes', {
    responses: {
      '200': {
        description: 'Conjunto.Habitante DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Habitante)) where?: Where<Habitante>,
  ): Promise<Count> {
    return this.conjuntoRepository.habitantes(id).delete(where);
  }
}
