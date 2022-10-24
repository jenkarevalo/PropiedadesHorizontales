import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PropiedadHorizMongoDbDataSource} from '../datasources';
import {Conjunto, ConjuntoRelations, ZonasSociales, Facturacion, Torre, Propietario, Habitante} from '../models';
import {ZonasSocialesRepository} from './zonas-sociales.repository';
import {FacturacionRepository} from './facturacion.repository';
import {TorreRepository} from './torre.repository';
import {PropietarioRepository} from './propietario.repository';
import {HabitanteRepository} from './habitante.repository';

export class ConjuntoRepository extends DefaultCrudRepository<
  Conjunto,
  typeof Conjunto.prototype.id,
  ConjuntoRelations
> {

  public readonly zonasSociales: HasManyRepositoryFactory<ZonasSociales, typeof Conjunto.prototype.id>;

  public readonly facturacions: HasManyRepositoryFactory<Facturacion, typeof Conjunto.prototype.id>;

  public readonly torres: HasManyRepositoryFactory<Torre, typeof Conjunto.prototype.id>;

  public readonly propietarios: HasManyRepositoryFactory<Propietario, typeof Conjunto.prototype.id>;

  public readonly habitantes: HasManyRepositoryFactory<Habitante, typeof Conjunto.prototype.id>;

  constructor(
    @inject('datasources.propiedadHorizMongoDB') dataSource: PropiedadHorizMongoDbDataSource, @repository.getter('ZonasSocialesRepository') protected zonasSocialesRepositoryGetter: Getter<ZonasSocialesRepository>, @repository.getter('FacturacionRepository') protected facturacionRepositoryGetter: Getter<FacturacionRepository>, @repository.getter('TorreRepository') protected torreRepositoryGetter: Getter<TorreRepository>, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('HabitanteRepository') protected habitanteRepositoryGetter: Getter<HabitanteRepository>,
  ) {
    super(Conjunto, dataSource);
    this.habitantes = this.createHasManyRepositoryFactoryFor('habitantes', habitanteRepositoryGetter,);
    this.registerInclusionResolver('habitantes', this.habitantes.inclusionResolver);
    this.propietarios = this.createHasManyRepositoryFactoryFor('propietarios', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietarios', this.propietarios.inclusionResolver);
    this.torres = this.createHasManyRepositoryFactoryFor('torres', torreRepositoryGetter,);
    this.registerInclusionResolver('torres', this.torres.inclusionResolver);
    this.facturacions = this.createHasManyRepositoryFactoryFor('facturacions', facturacionRepositoryGetter,);
    this.registerInclusionResolver('facturacions', this.facturacions.inclusionResolver);
    this.zonasSociales = this.createHasManyRepositoryFactoryFor('zonasSociales', zonasSocialesRepositoryGetter,);
    this.registerInclusionResolver('zonasSociales', this.zonasSociales.inclusionResolver);
  }
}
