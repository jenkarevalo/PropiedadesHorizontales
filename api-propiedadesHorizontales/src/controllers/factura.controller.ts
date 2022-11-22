import { service } from '@loopback/core';
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
import {Factura} from '../models';
import {FacturaRepository} from '../repositories';
import { FacturaService } from '../services';

export class FacturaController {
  constructor(
    @repository(FacturaRepository)
    public facturaRepository : FacturaRepository,
    @service(FacturaService)
    public facturaService: FacturaService
  ) {}


  @get('/notas-debito')
  @response (200, {
    description: 'consulta listado de notas debitos',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Factura, {includeRelations: true}),
        },
      },
    },
  })
  async listadoNotasDebito(): Promise<Factura[]> {
    return this.facturaService.getNotasDb();
  }


  @get('/notas-credito')
  @response (200, {
    description: 'consulta listado de notas creditos',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Factura, {includeRelations: true}),
        },
      },
    },
  })
  async listadoNotasCredito(): Promise<Factura[]> {
    return this.facturaService.getNotasCr();
  }




  @post('/facturas')
  @response(200, {
    description: 'Factura model instance',
    content: {'application/json': {schema: getModelSchemaRef(Factura)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {
            title: 'NewFactura',
            exclude: ['id'],
          }),
        },
      },
    })
    factura: Omit<Factura, 'id'>,
  ): Promise<Factura> {
    return this.facturaRepository.create(factura);
  }

  @get('/facturas/count')
  @response(200, {
    description: 'Factura model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Factura) where?: Where<Factura>,
  ): Promise<Count> {
    return this.facturaRepository.count(where);
  }

  @get('/facturas')
  @response(200, {
    description: 'Array of Factura model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Factura, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Factura) filter?: Filter<Factura>,
  ): Promise<Factura[]> {
    return this.facturaRepository.find(filter);
  }

  @patch('/facturas')
  @response(200, {
    description: 'Factura PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {partial: true}),
        },
      },
    })
    factura: Factura,
    @param.where(Factura) where?: Where<Factura>,
  ): Promise<Count> {
    return this.facturaRepository.updateAll(factura, where);
  }

  @get('/facturas/{id}')
  @response(200, {
    description: 'Factura model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Factura, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Factura, {exclude: 'where'}) filter?: FilterExcludingWhere<Factura>
  ): Promise<Factura> {
    return this.facturaRepository.findById(id, filter);
  }

  @patch('/facturas/{id}')
  @response(204, {
    description: 'Factura PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {partial: true}),
        },
      },
    })
    factura: Factura,
  ): Promise<void> {
    await this.facturaRepository.updateById(id, factura);
  }

  @put('/facturas/{id}')
  @response(204, {
    description: 'Factura PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() factura: Factura,
  ): Promise<void> {
    await this.facturaRepository.replaceById(id, factura);
  }

  @del('/facturas/{id}')
  @response(204, {
    description: 'Factura DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.facturaRepository.deleteById(id);
  }
}
