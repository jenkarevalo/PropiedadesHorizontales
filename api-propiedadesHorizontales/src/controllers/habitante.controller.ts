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
import {Credenciales, Habitante} from '../models';
import {HabitanteRepository} from '../repositories';
import {AutenticacionService} from '../services/autenticacion.service';
import fetch from 'cross-fetch';
import { service } from '@loopback/core';
import { HabitanteService } from '../services';

export class HabitanteController {
  constructor(
    @repository(HabitanteRepository)
    public habitanteRepository : HabitanteRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService,
    @service (HabitanteService)
    public habitanteService : HabitanteService,
  ) {}

  @post('/validar-acceso')
  @response (200, {
    description: 'Validar las credenciales de acceso de los habitantes'
  })
  async validarAcceso(
    @requestBody() credenciales: Credenciales
  ){
    let prop = await this.servicioAutenticacion.validarAcceso(credenciales.usuario, credenciales.clave);
    if (prop){
      let token = this.servicioAutenticacion.generarTokenJWT(prop);
      return {
        datos:{
          nombre: `${prop.primerNombre} ${prop.primerApellido}`,
          email: prop.email,
          id: prop.id
        },
        token: token
      }
    }
  }
  
  @post('/habitantes')
  @response(200, {
    description: 'Habitante model instance',
    content: {'application/json': {schema: getModelSchemaRef(Habitante)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Habitante, {
            title: 'NewHabitante',
            exclude: ['id'],
          }),
        },
      },
    })
    habitante: Omit<Habitante, 'id'>,
  ): Promise<Habitante> {
    habitante.clave = this.servicioAutenticacion.CifrarClave(habitante.clave);
    let prop = await this.habitanteRepository.create(habitante);

    let destino = habitante.email;
    let asunto = 'Registro exitoso'
    let contenido = `Hola ${habitante.primerNombre}, ${habitante.primerApellido}, su usuario es: ${habitante.email}, su contraseña es:${habitante.clave} `;

    fetch(`http://localhost:5000/enviar-correo?correo=${destino}&asunto=${asunto}&mensaje=${contenido}`)
      .then((data) => {
        console.log(`Esta es la respuesta del servicio ${data}`);
      })
    return prop;
  }

  @get('/habitantes/count')
  @response(200, {
    description: 'Habitante model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Habitante) where?: Where<Habitante>,
  ): Promise<Count> {
    return this.habitanteRepository.count(where);
  }

  @get('/habitantes')
  @response(200, {
    description: 'Array of Habitante model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Habitante, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Habitante) filter?: Filter<Habitante>,
  ): Promise<Habitante[]> {
    return this.habitanteRepository.find(filter);
  }

  @patch('/habitantes')
  @response(200, {
    description: 'Habitante PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Habitante, {partial: true}),
        },
      },
    })
    habitante: Habitante,
    @param.where(Habitante) where?: Where<Habitante>,
  ): Promise<Count> {
    return this.habitanteRepository.updateAll(habitante, where);
  }

  @get('/habitantes/{id}')
  @response(200, {
    description: 'Habitante model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Habitante, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Habitante, {exclude: 'where'}) filter?: FilterExcludingWhere<Habitante>
  ): Promise<Habitante> {
    return this.habitanteRepository.findById(id, filter);
  }

  @get('/habitante-apartamento/{documento}')
  @response(200, {
  description: 'Consulta de habitantes y su apartamento correspondiente',
  content: {
      'application/json': {
      schema: {
          type: 'array',
          items: getModelSchemaRef(Habitante, {includeRelations: true}),
        },
      },
    },
  })
  async HabitanteApto(
  @param.path.string('documento')documento:string
  ): Promise<Habitante[]> {
    return this.habitanteService.getHabitanteApto(documento);
  }

  @patch('/habitantes/{id}')
  @response(204, {
    description: 'Habitante PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Habitante, {partial: true}),
        },
      },
    })
    habitante: Habitante,
  ): Promise<void> {
    await this.habitanteRepository.updateById(id, habitante);
  }

  @put('/habitantes/{id}')
  @response(204, {
    description: 'Habitante PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() habitante: Habitante,
  ): Promise<void> {
    await this.habitanteRepository.replaceById(id, habitante);
  }

  @del('/habitantes/{id}')
  @response(204, {
    description: 'Habitante DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.habitanteRepository.deleteById(id);
  }
}
