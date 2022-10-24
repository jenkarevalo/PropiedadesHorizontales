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
  Habitante,
} from '../models';
import {ApartamentoRepository} from '../repositories';

export class ApartamentoHabitanteController {
  constructor(
    @repository(ApartamentoRepository) protected apartamentoRepository: ApartamentoRepository,
  ) { }

  @get('/apartamentos/{id}/habitantes', {
    responses: {
      '200': {
        description: 'Array of Apartamento has many Habitante',
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
    return this.apartamentoRepository.habitantes(id).find(filter);
  }

  @post('/apartamentos/{id}/habitantes', {
    responses: {
      '200': {
        description: 'Apartamento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Habitante)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Apartamento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Habitante, {
            title: 'NewHabitanteInApartamento',
            exclude: ['id'],
            optional: ['apartamentoId']
          }),
        },
      },
    }) habitante: Omit<Habitante, 'id'>,
  ): Promise<Habitante> {
    return this.apartamentoRepository.habitantes(id).create(habitante);
  }

  @patch('/apartamentos/{id}/habitantes', {
    responses: {
      '200': {
        description: 'Apartamento.Habitante PATCH success count',
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
    return this.apartamentoRepository.habitantes(id).patch(habitante, where);
  }

  @del('/apartamentos/{id}/habitantes', {
    responses: {
      '200': {
        description: 'Apartamento.Habitante DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Habitante)) where?: Where<Habitante>,
  ): Promise<Count> {
    return this.apartamentoRepository.habitantes(id).delete(where);
  }
}
