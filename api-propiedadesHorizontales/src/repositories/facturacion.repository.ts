import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PropiedadHorizMongoDbDataSource} from '../datasources';
import {Facturacion, FacturacionRelations} from '../models';

export class FacturacionRepository extends DefaultCrudRepository<
  Facturacion,
  typeof Facturacion.prototype.id,
  FacturacionRelations
> {
  constructor(
    @inject('datasources.propiedadHorizMongoDB') dataSource: PropiedadHorizMongoDbDataSource,
  ) {
    super(Facturacion, dataSource);
  }
}
