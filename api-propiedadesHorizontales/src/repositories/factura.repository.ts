import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PropiedadHorizMongoDbDataSource} from '../datasources';
import {Factura, FacturaRelations, Apartamento} from '../models';
import {ApartamentoRepository} from './apartamento.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id,
  FacturaRelations
> {

  public readonly apartamento: BelongsToAccessor<Apartamento, typeof Factura.prototype.id>;

  constructor(
    @inject('datasources.propiedadHorizMongoDB') dataSource: PropiedadHorizMongoDbDataSource, @repository.getter('ApartamentoRepository') protected apartamentoRepositoryGetter: Getter<ApartamentoRepository>,
  ) {
    super(Factura, dataSource);
    this.apartamento = this.createBelongsToAccessorFor('apartamento', apartamentoRepositoryGetter,);
    this.registerInclusionResolver('apartamento', this.apartamento.inclusionResolver);
  }
}
