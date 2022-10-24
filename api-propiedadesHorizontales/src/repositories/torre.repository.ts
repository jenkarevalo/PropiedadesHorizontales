import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {PropiedadHorizMongoDbDataSource} from '../datasources';
import {Torre, TorreRelations, Conjunto, Apartamento} from '../models';
import {ConjuntoRepository} from './conjunto.repository';
import {ApartamentoRepository} from './apartamento.repository';

export class TorreRepository extends DefaultCrudRepository<
  Torre,
  typeof Torre.prototype.id,
  TorreRelations
> {

  public readonly conjunto: BelongsToAccessor<Conjunto, typeof Torre.prototype.id>;

  public readonly apartamentos: HasManyRepositoryFactory<Apartamento, typeof Torre.prototype.id>;

  constructor(
    @inject('datasources.propiedadHorizMongoDB') dataSource: PropiedadHorizMongoDbDataSource, @repository.getter('ConjuntoRepository') protected conjuntoRepositoryGetter: Getter<ConjuntoRepository>, @repository.getter('ApartamentoRepository') protected apartamentoRepositoryGetter: Getter<ApartamentoRepository>,
  ) {
    super(Torre, dataSource);
    this.apartamentos = this.createHasManyRepositoryFactoryFor('apartamentos', apartamentoRepositoryGetter,);
    this.registerInclusionResolver('apartamentos', this.apartamentos.inclusionResolver);
    this.conjunto = this.createBelongsToAccessorFor('conjunto', conjuntoRepositoryGetter,);
    this.registerInclusionResolver('conjunto', this.conjunto.inclusionResolver);
  }
}
