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
  Propietario,
} from '../models';
import {ConjuntoRepository} from '../repositories';

export class ConjuntoPropietarioController {
  constructor(
    @repository(ConjuntoRepository) protected conjuntoRepository: ConjuntoRepository,
  ) { }

  @get('/conjuntos/{id}/propietarios', {
    responses: {
      '200': {
        description: 'Array of Conjunto has many Propietario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Propietario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Propietario>,
  ): Promise<Propietario[]> {
    return this.conjuntoRepository.propietarios(id).find(filter);
  }

  @post('/conjuntos/{id}/propietarios', {
    responses: {
      '200': {
        description: 'Conjunto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Propietario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Conjunto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Propietario, {
            title: 'NewPropietarioInConjunto',
            exclude: ['id'],
            optional: ['conjuntoId']
          }),
        },
      },
    }) propietario: Omit<Propietario, 'id'>,
  ): Promise<Propietario> {
    return this.conjuntoRepository.propietarios(id).create(propietario);
  }

  @patch('/conjuntos/{id}/propietarios', {
    responses: {
      '200': {
        description: 'Conjunto.Propietario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Propietario, {partial: true}),
        },
      },
    })
    propietario: Partial<Propietario>,
    @param.query.object('where', getWhereSchemaFor(Propietario)) where?: Where<Propietario>,
  ): Promise<Count> {
    return this.conjuntoRepository.propietarios(id).patch(propietario, where);
  }

  @del('/conjuntos/{id}/propietarios', {
    responses: {
      '200': {
        description: 'Conjunto.Propietario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Propietario)) where?: Where<Propietario>,
  ): Promise<Count> {
    return this.conjuntoRepository.propietarios(id).delete(where);
  }
}
