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
import {Torre} from '../models';
import {TorreRepository} from '../repositories';

export class TorreController {
  constructor(
    @repository(TorreRepository)
    public torreRepository : TorreRepository,
  ) {}

  @post('/torres')
  @response(200, {
    description: 'Torre model instance',
    content: {'application/json': {schema: getModelSchemaRef(Torre)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Torre, {
            title: 'NewTorre',
            exclude: ['id'],
          }),
        },
      },
    })
    torre: Omit<Torre, 'id'>,
  ): Promise<Torre> {
    return this.torreRepository.create(torre);
  }

  @get('/torres/count')
  @response(200, {
    description: 'Torre model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Torre) where?: Where<Torre>,
  ): Promise<Count> {
    return this.torreRepository.count(where);
  }

  @get('/torres')
  @response(200, {
    description: 'Array of Torre model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Torre, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Torre) filter?: Filter<Torre>,
  ): Promise<Torre[]> {
    return this.torreRepository.find(filter);
  }

  @patch('/torres')
  @response(200, {
    description: 'Torre PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Torre, {partial: true}),
        },
      },
    })
    torre: Torre,
    @param.where(Torre) where?: Where<Torre>,
  ): Promise<Count> {
    return this.torreRepository.updateAll(torre, where);
  }

  @get('/torres/{id}')
  @response(200, {
    description: 'Torre model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Torre, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Torre, {exclude: 'where'}) filter?: FilterExcludingWhere<Torre>
  ): Promise<Torre> {
    return this.torreRepository.findById(id, filter);
  }

  @patch('/torres/{id}')
  @response(204, {
    description: 'Torre PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Torre, {partial: true}),
        },
      },
    })
    torre: Torre,
  ): Promise<void> {
    await this.torreRepository.updateById(id, torre);
  }

  @put('/torres/{id}')
  @response(204, {
    description: 'Torre PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() torre: Torre,
  ): Promise<void> {
    await this.torreRepository.replaceById(id, torre);
  }

  @del('/torres/{id}')
  @response(204, {
    description: 'Torre DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.torreRepository.deleteById(id);
  }
}
