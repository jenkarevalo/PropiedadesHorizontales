import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PropiedadHorizMongoDbDataSource} from '../datasources';
import {Habitante, HabitanteRelations} from '../models';

export class HabitanteRepository extends DefaultCrudRepository<
  Habitante,
  typeof Habitante.prototype.id,
  HabitanteRelations
> {
  constructor(
    @inject('datasources.propiedadHorizMongoDB') dataSource: PropiedadHorizMongoDbDataSource,
  ) {
    super(Habitante, dataSource);
  }
}
