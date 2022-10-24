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
import {ZonasSociales} from '../models';
import {ZonasSocialesRepository} from '../repositories';

export class ZonasSocialesController {
  constructor(
    @repository(ZonasSocialesRepository)
    public zonasSocialesRepository : ZonasSocialesRepository,
  ) {}

  @post('/zonas-sociales')
  @response(200, {
    description: 'ZonasSociales model instance',
    content: {'application/json': {schema: getModelSchemaRef(ZonasSociales)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ZonasSociales, {
            title: 'NewZonasSociales',
            exclude: ['id'],
          }),
        },
      },
    })
    zonasSociales: Omit<ZonasSociales, 'id'>,
  ): Promise<ZonasSociales> {
    return this.zonasSocialesRepository.create(zonasSociales);
  }

  @get('/zonas-sociales/count')
  @response(200, {
    description: 'ZonasSociales model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ZonasSociales) where?: Where<ZonasSociales>,
  ): Promise<Count> {
    return this.zonasSocialesRepository.count(where);
  }

  @get('/zonas-sociales')
  @response(200, {
    description: 'Array of ZonasSociales model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ZonasSociales, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ZonasSociales) filter?: Filter<ZonasSociales>,
  ): Promise<ZonasSociales[]> {
    return this.zonasSocialesRepository.find(filter);
  }

  @patch('/zonas-sociales')
  @response(200, {
    description: 'ZonasSociales PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ZonasSociales, {partial: true}),
        },
      },
    })
    zonasSociales: ZonasSociales,
    @param.where(ZonasSociales) where?: Where<ZonasSociales>,
  ): Promise<Count> {
    return this.zonasSocialesRepository.updateAll(zonasSociales, where);
  }

  @get('/zonas-sociales/{id}')
  @response(200, {
    description: 'ZonasSociales model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ZonasSociales, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ZonasSociales, {exclude: 'where'}) filter?: FilterExcludingWhere<ZonasSociales>
  ): Promise<ZonasSociales> {
    return this.zonasSocialesRepository.findById(id, filter);
  }

  @patch('/zonas-sociales/{id}')
  @response(204, {
    description: 'ZonasSociales PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ZonasSociales, {partial: true}),
        },
      },
    })
    zonasSociales: ZonasSociales,
  ): Promise<void> {
    await this.zonasSocialesRepository.updateById(id, zonasSociales);
  }

  @put('/zonas-sociales/{id}')
  @response(204, {
    description: 'ZonasSociales PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() zonasSociales: ZonasSociales,
  ): Promise<void> {
    await this.zonasSocialesRepository.replaceById(id, zonasSociales);
  }

  @del('/zonas-sociales/{id}')
  @response(204, {
    description: 'ZonasSociales DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.zonasSocialesRepository.deleteById(id);
  }
}
