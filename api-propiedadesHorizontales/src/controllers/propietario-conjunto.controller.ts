import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Propietario,
  Conjunto,
} from '../models';
import {PropietarioRepository} from '../repositories';

export class PropietarioConjuntoController {
  constructor(
    @repository(PropietarioRepository)
    public propietarioRepository: PropietarioRepository,
  ) { }

  @get('/propietarios/{id}/conjunto', {
    responses: {
      '200': {
        description: 'Conjunto belonging to Propietario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Conjunto)},
          },
        },
      },
    },
  })
  async getConjunto(
    @param.path.string('id') id: typeof Propietario.prototype.id,
  ): Promise<Conjunto> {
    return this.propietarioRepository.conjunto(id);
  }
}
