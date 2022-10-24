import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Conjunto} from '../models';
import {ConjuntoRepository} from '../repositories';

export class ConjuntoController {
  constructor(
    @repository(ConjuntoRepository)
    public conjuntoRepository : ConjuntoRepository,
  ) {}

  @post('/conjuntos')
  @response(200, {
    description: 'Conjunto model instance',
    content: {'application/json': {schema: getModelSchemaRef(Conjunto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conjunto, {
            title: 'NewConjunto',
            exclude: ['id'],
          }),
        },
      },
    })
    conjunto: Omit<Conjunto, 'id'>,
  ): Promise<Conjunto> {
    return this.conjuntoRepository.create(conjunto);
  }

  @get('/conjuntos/count')
  @response(200, {
    description: 'Conjunto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Conjunto) where?: Where<Conjunto>,
  ): Promise<Count> {
    return this.conjuntoRepository.count(where);
  }

  @get('/conjuntos')
  @response(200, {
    description: 'Array of Conjunto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Conjunto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Conjunto) filter?: Filter<Conjunto>,
  ): Promise<Conjunto[]> {
    return this.conjuntoRepository.find(filter);
  }

  @patch('/conjuntos')
  @response(200, {
    description: 'Conjunto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conjunto, {partial: true}),
        },
      },
    })
    conjunto: Conjunto,
    @param.where(Conjunto) where?: Where<Conjunto>,
  ): Promise<Count> {
    return this.conjuntoRepository.updateAll(conjunto, where);
  }

  @get('/conjuntos/{id}')
  @response(200, {
    description: 'Conjunto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Conjunto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Conjunto, {exclude: 'where'}) filter?: FilterExcludingWhere<Conjunto>
  ): Promise<Conjunto> {
    return this.conjuntoRepository.findById(id, filter);
  }

  @patch('/conjuntos/{id}')
  @response(204, {
    description: 'Conjunto PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conjunto, {partial: true}),
        },
      },
    })
    conjunto: Conjunto,
  ): Promise<void> {
    await this.conjuntoRepository.updateById(id, conjunto);
  }

  @put('/conjuntos/{id}')
  @response(204, {
    description: 'Conjunto PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() conjunto: Conjunto,
  ): Promise<void> {
    await this.conjuntoRepository.replaceById(id, conjunto);
  }

  @del('/conjuntos/{id}')
  @response(204, {
    description: 'Conjunto DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.conjuntoRepository.deleteById(id);
  }
}
