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
import {Apartamento} from '../models';
import {ApartamentoRepository} from '../repositories';

export class ApartamentoController {
  constructor(
    @repository(ApartamentoRepository)
    public apartamentoRepository : ApartamentoRepository,
  ) {}

  @post('/apartamentos')
  @response(200, {
    description: 'Apartamento model instance',
    content: {'application/json': {schema: getModelSchemaRef(Apartamento)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Apartamento, {
            title: 'NewApartamento',
            exclude: ['id'],
          }),
        },
      },
    })
    apartamento: Omit<Apartamento, 'id'>,
  ): Promise<Apartamento> {
    return this.apartamentoRepository.create(apartamento);
  }

  @get('/apartamentos/count')
  @response(200, {
    description: 'Apartamento model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Apartamento) where?: Where<Apartamento>,
  ): Promise<Count> {
    return this.apartamentoRepository.count(where);
  }

  @get('/apartamentos')
  @response(200, {
    description: 'Array of Apartamento model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Apartamento, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Apartamento) filter?: Filter<Apartamento>,
  ): Promise<Apartamento[]> {
    return this.apartamentoRepository.find(filter);
  }

  @patch('/apartamentos')
  @response(200, {
    description: 'Apartamento PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Apartamento, {partial: true}),
        },
      },
    })
    apartamento: Apartamento,
    @param.where(Apartamento) where?: Where<Apartamento>,
  ): Promise<Count> {
    return this.apartamentoRepository.updateAll(apartamento, where);
  }

  @get('/apartamentos/{id}')
  @response(200, {
    description: 'Apartamento model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Apartamento, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Apartamento, {exclude: 'where'}) filter?: FilterExcludingWhere<Apartamento>
  ): Promise<Apartamento> {
    return this.apartamentoRepository.findById(id, filter);
  }

  @patch('/apartamentos/{id}')
  @response(204, {
    description: 'Apartamento PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Apartamento, {partial: true}),
        },
      },
    })
    apartamento: Apartamento,
  ): Promise<void> {
    await this.apartamentoRepository.updateById(id, apartamento);
  }

  @put('/apartamentos/{id}')
  @response(204, {
    description: 'Apartamento PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() apartamento: Apartamento,
  ): Promise<void> {
    await this.apartamentoRepository.replaceById(id, apartamento);
  }

  @del('/apartamentos/{id}')
  @response(204, {
    description: 'Apartamento DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.apartamentoRepository.deleteById(id);
  }
}
