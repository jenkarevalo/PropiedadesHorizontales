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
  Propietario,
  Apartamento,
} from '../models';
import {PropietarioRepository} from '../repositories';

export class PropietarioApartamentoController {
  constructor(
    @repository(PropietarioRepository) protected propietarioRepository: PropietarioRepository,
  ) { }

  @get('/propietarios/{id}/apartamentos', {
    responses: {
      '200': {
        description: 'Array of Propietario has many Apartamento',
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
    return this.propietarioRepository.apartamentos(id).find(filter);
  }

  @post('/propietarios/{id}/apartamentos', {
    responses: {
      '200': {
        description: 'Propietario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Apartamento)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Propietario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Apartamento, {
            title: 'NewApartamentoInPropietario',
            exclude: ['id'],
            optional: ['propietarioId']
          }),
        },
      },
    }) apartamento: Omit<Apartamento, 'id'>,
  ): Promise<Apartamento> {
    return this.propietarioRepository.apartamentos(id).create(apartamento);
  }

  @patch('/propietarios/{id}/apartamentos', {
    responses: {
      '200': {
        description: 'Propietario.Apartamento PATCH success count',
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
    return this.propietarioRepository.apartamentos(id).patch(apartamento, where);
  }

  @del('/propietarios/{id}/apartamentos', {
    responses: {
      '200': {
        description: 'Propietario.Apartamento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Apartamento)) where?: Where<Apartamento>,
  ): Promise<Count> {
    return this.propietarioRepository.apartamentos(id).delete(where);
  }
}
