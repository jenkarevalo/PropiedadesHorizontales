import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PropiedadHorizMongoDbDataSource} from '../datasources';
import {Conjunto, ConjuntoRelations} from '../models';

export class ConjuntoRepository extends DefaultCrudRepository<
  Conjunto,
  typeof Conjunto.prototype.id,
  ConjuntoRelations
> {
  constructor(
    @inject('datasources.propiedadHorizMongoDB') dataSource: PropiedadHorizMongoDbDataSource,
  ) {
    super(Conjunto, dataSource);
  }
}
