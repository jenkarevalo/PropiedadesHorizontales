import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PropiedadHorizMongoDbDataSource} from '../datasources';
import {ZonasSociales, ZonasSocialesRelations} from '../models';

export class ZonasSocialesRepository extends DefaultCrudRepository<
  ZonasSociales,
  typeof ZonasSociales.prototype.id,
  ZonasSocialesRelations
> {
  constructor(
    @inject('datasources.propiedadHorizMongoDB') dataSource: PropiedadHorizMongoDbDataSource,
  ) {
    super(ZonasSociales, dataSource);
  }
}
