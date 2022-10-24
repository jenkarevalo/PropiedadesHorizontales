import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PropiedadHorizMongoDbDataSource} from '../datasources';
import {Facturacion, FacturacionRelations, Conjunto} from '../models';
import {ConjuntoRepository} from './conjunto.repository';

export class FacturacionRepository extends DefaultCrudRepository<
  Facturacion,
  typeof Facturacion.prototype.id,
  FacturacionRelations
> {

  public readonly conjunto: BelongsToAccessor<Conjunto, typeof Facturacion.prototype.id>;

  constructor(
    @inject('datasources.propiedadHorizMongoDB') dataSource: PropiedadHorizMongoDbDataSource, @repository.getter('ConjuntoRepository') protected conjuntoRepositoryGetter: Getter<ConjuntoRepository>,
  ) {
    super(Facturacion, dataSource);
    this.conjunto = this.createBelongsToAccessorFor('conjunto', conjuntoRepositoryGetter,);
    this.registerInclusionResolver('conjunto', this.conjunto.inclusionResolver);
  }
}
