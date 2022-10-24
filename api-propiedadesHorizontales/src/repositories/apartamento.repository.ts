import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PropiedadHorizMongoDbDataSource} from '../datasources';
import {Apartamento, ApartamentoRelations} from '../models';

export class ApartamentoRepository extends DefaultCrudRepository<
  Apartamento,
  typeof Apartamento.prototype.id,
  ApartamentoRelations
> {
  constructor(
    @inject('datasources.propiedadHorizMongoDB') dataSource: PropiedadHorizMongoDbDataSource,
  ) {
    super(Apartamento, dataSource);
  }
}
