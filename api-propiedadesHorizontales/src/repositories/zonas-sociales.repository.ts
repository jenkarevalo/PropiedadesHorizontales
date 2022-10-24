import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PropiedadHorizMongoDbDataSource} from '../datasources';
import {ZonasSociales, ZonasSocialesRelations, Conjunto} from '../models';
import {ConjuntoRepository} from './conjunto.repository';

export class ZonasSocialesRepository extends DefaultCrudRepository<
  ZonasSociales,
  typeof ZonasSociales.prototype.id,
  ZonasSocialesRelations
> {

  public readonly conjunto: BelongsToAccessor<Conjunto, typeof ZonasSociales.prototype.id>;

  constructor(
    @inject('datasources.propiedadHorizMongoDB') dataSource: PropiedadHorizMongoDbDataSource, @repository.getter('ConjuntoRepository') protected conjuntoRepositoryGetter: Getter<ConjuntoRepository>,
  ) {
    super(ZonasSociales, dataSource);
    this.conjunto = this.createBelongsToAccessorFor('conjunto', conjuntoRepositoryGetter,);
    this.registerInclusionResolver('conjunto', this.conjunto.inclusionResolver);
  }
}
