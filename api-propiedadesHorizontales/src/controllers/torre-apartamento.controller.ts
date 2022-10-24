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
  Torre,
  Apartamento,
} from '../models';
import {TorreRepository} from '../repositories';

export class TorreApartamentoController {
  constructor(
    @repository(TorreRepository) protected torreRepository: TorreRepository,
  ) { }

  @get('/torres/{id}/apartamentos', {
    responses: {
      '200': {
        description: 'Array of Torre has many Apartamento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Apartamento)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Apartamento>,
  ): Promise<Apartamento[]> {
    return this.torreRepository.apartamentos(id).find(filter);
  }

  @post('/torres/{id}/apartamentos', {
    responses: {
      '200': {
        description: 'Torre model instance',
        content: {'application/json': {schema: getModelSchemaRef(Apartamento)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Torre.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Apartamento, {
            title: 'NewApartamentoInTorre',
            exclude: ['id'],
            optional: ['torreId']
          }),
        },
      },
    }) apartamento: Omit<Apartamento, 'id'>,
  ): Promise<Apartamento> {
    return this.torreRepository.apartamentos(id).create(apartamento);
  }

  @patch('/torres/{id}/apartamentos', {
    responses: {
      '200': {
        description: 'Torre.Apartamento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Apartamento, {partial: true}),
        },
      },
    })
    apartamento: Partial<Apartamento>,
    @param.query.object('where', getWhereSchemaFor(Apartamento)) where?: Where<Apartamento>,
  ): Promise<Count> {
    return this.torreRepository.apartamentos(id).patch(apartamento, where);
  }

  @del('/torres/{id}/apartamentos', {
    responses: {
      '200': {
        description: 'Torre.Apartamento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Apartamento)) where?: Where<Apartamento>,
  ): Promise<Count> {
    return this.torreRepository.apartamentos(id).delete(where);
  }
}
