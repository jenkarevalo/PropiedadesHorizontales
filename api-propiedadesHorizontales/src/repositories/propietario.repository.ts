import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PropiedadHorizMongoDbDataSource} from '../datasources';
import {Propietario, PropietarioRelations} from '../models';

export class PropietarioRepository extends DefaultCrudRepository<
  Propietario,
  typeof Propietario.prototype.id,
  PropietarioRelations
> {
  constructor(
    @inject('datasources.propiedadHorizMongoDB') dataSource: PropiedadHorizMongoDbDataSource,
  ) {
    super(Propietario, dataSource);
  }
}
