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

import { Credenciales, Propietario } from '../models';
import { PropietarioRepository } from '../repositories';
import { AutenticacionService } from '../services/autenticacion.service';
import fetch from 'cross-fetch';
import { PropietarioService } from '../services';
import { request } from 'http';

export class PropietarioController {
  constructor(
    @repository(PropietarioRepository)
    public propietarioRepository: PropietarioRepository,
    @service(AutenticacionService)

    public servicioAutenticacion: AutenticacionService,
    @service(PropietarioService)
    public propietarioService: PropietarioService
  ) { }


  @post('/validar-acceso')
  @response(200, {
    description: 'Validar las credenciales de acceso del propietario'
  })
  async validarAcceso(
    @requestBody() credenciales: Credenciales
  ) {
    let prop = await this.servicioAutenticacion.validarAcceso(credenciales.usuario, credenciales.clave);
    if (prop) {
      let token = this.servicioAutenticacion.generarTokenJWT(prop);
      return {
        datos: {
          nombre: `${prop.primerNombre} ${prop.primerApellido}`,
          email: prop.email,
          id: prop.id
        },
        token: token
      }
    }
  }

  @post('/propietarios')
  @response(200, {
    description: 'Propietario model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Propietario) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Propietario, {
            title: 'NewPropietario',
            exclude: ['id'],
          }),
        },
      },
    })
    propietario: Omit<Propietario, 'id'>,
  ): Promise<Propietario> {

    //let clave = this.servicioAutenticacion.GenerarClave();
    //let claveCifrada = this.servicioAutenticacion.CifrarClave(clave);
    //propietario.clave= claveCifrada;
    propietario.clave = this.servicioAutenticacion.CifrarClave(propietario.clave);
    let prop = await this.propietarioRepository.create(propietario);



    let destino = propietario.email;
    let asunto = 'Registro exitoso'
    let contenido = `Hola ${propietario.primerNombre}, su usuario es: ${propietario.email}, su contraseña es:${propietario.clave} `;

    fetch(`http://localhost:5000/enviar-correo?correo=${destino}&asunto=${asunto}&mensaje=${contenido}`)
      .then((data) => {
        console.log(`Esta es la respuesta del servicio ${data}`);
      })
    return prop;
  }

  @get('/propietarios/count')
  @response(200, {
    description: 'Propietario model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(Propietario) where?: Where<Propietario>,
  ): Promise<Count> {
    return this.propietarioRepository.count(where);
  }

  @get('/propietarios')
  @response(200, {
    description: 'Array of Propietario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Propietario, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(Propietario) filter?: Filter<Propietario>,
  ): Promise<Propietario[]> {
    return this.propietarioRepository.find(filter);
  }

  @patch('/propietarios')
  @response(200, {
    description: 'Propietario PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Propietario, { partial: true }),
        },
      },
    })
    propietario: Propietario,
    @param.where(Propietario) where?: Where<Propietario>,
  ): Promise<Count> {
    return this.propietarioRepository.updateAll(propietario, where);
  }

  @get('/propietarios/{id}')
  @response(200, {
    description: 'Propietario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Propietario, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Propietario, { exclude: 'where' }) filter?: FilterExcludingWhere<Propietario>
  ): Promise<Propietario> {
    return this.propietarioRepository.findById(id, filter);
  }

  @get('/propietario-apartamento/{documento}')
  @response(200, {
    description: 'Consulta de propietario y apartamento',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Propietario, { includeRelations: true }),
        },
      },
    },
  })
  async PropietarioPropiedad(
    @param.path.string('documento') documento: string
  ): Promise<Propietario[]> {
    return this.propietarioService.getPropietarioPropiedad(documento);
  }

  @patch('/propietarios/{id}')
  @response(204, {
    description: 'Propietario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Propietario, { partial: true }),
        },
      },
    })
    propietario: Propietario,
  ): Promise<void> {
    await this.propietarioRepository.updateById(id, propietario);
  }

  @put('/propietarios/{id}')
  @response(204, {
    description: 'Propietario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() propietario: Propietario,
  ): Promise<void> {
    await this.propietarioRepository.replaceById(id, propietario);
  }

  @del('/propietarios/{id}')
  @response(204, {
    description: 'Propietario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.propietarioRepository.deleteById(id);
  }
}
