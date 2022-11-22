import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {PropiedadHorizMongoDbDataSource} from '../datasources';
import {Apartamento, ApartamentoRelations, Torre, Propietario, Habitante, Factura} from '../models';
import {TorreRepository} from './torre.repository';
import {PropietarioRepository} from './propietario.repository';
import {HabitanteRepository} from './habitante.repository';
import {FacturaRepository} from './factura.repository';

export class ApartamentoRepository extends DefaultCrudRepository<
  Apartamento,
  typeof Apartamento.prototype.id,
  ApartamentoRelations
> {

  public readonly torre: BelongsToAccessor<Torre, typeof Apartamento.prototype.id>;

  public readonly propietario: BelongsToAccessor<Propietario, typeof Apartamento.prototype.id>;

  public readonly habitantes: HasManyRepositoryFactory<Habitante, typeof Apartamento.prototype.id>;

  public readonly facturas: HasManyRepositoryFactory<Factura, typeof Apartamento.prototype.id>;

  constructor(
    @inject('datasources.propiedadHorizMongoDB') dataSource: PropiedadHorizMongoDbDataSource, @repository.getter('TorreRepository') protected torreRepositoryGetter: Getter<TorreRepository>, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('HabitanteRepository') protected habitanteRepositoryGetter: Getter<HabitanteRepository>, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(Apartamento, dataSource);
    this.facturas = this.createHasManyRepositoryFactoryFor('facturas', facturaRepositoryGetter,);
    this.registerInclusionResolver('facturas', this.facturas.inclusionResolver);
    this.habitantes = this.createHasManyRepositoryFactoryFor('habitantes', habitanteRepositoryGetter,);
    this.registerInclusionResolver('habitantes', this.habitantes.inclusionResolver);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
    this.torre = this.createBelongsToAccessorFor('torre', torreRepositoryGetter,);
    this.registerInclusionResolver('torre', this.torre.inclusionResolver);
  }
}
