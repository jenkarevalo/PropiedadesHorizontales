import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PropiedadHorizMongoDbDataSource} from '../datasources';
import {Habitante, HabitanteRelations, Apartamento, Conjunto} from '../models';
import {ApartamentoRepository} from './apartamento.repository';
import {ConjuntoRepository} from './conjunto.repository';

export class HabitanteRepository extends DefaultCrudRepository<
  Habitante,
  typeof Habitante.prototype.id,
  HabitanteRelations
> {

  public readonly apartamento: BelongsToAccessor<Apartamento, typeof Habitante.prototype.id>;

  public readonly conjunto: BelongsToAccessor<Conjunto, typeof Habitante.prototype.id>;

  constructor(
    @inject('datasources.propiedadHorizMongoDB') dataSource: PropiedadHorizMongoDbDataSource, @repository.getter('ApartamentoRepository') protected apartamentoRepositoryGetter: Getter<ApartamentoRepository>, @repository.getter('ConjuntoRepository') protected conjuntoRepositoryGetter: Getter<ConjuntoRepository>,
  ) {
    super(Habitante, dataSource);
    this.conjunto = this.createBelongsToAccessorFor('conjunto', conjuntoRepositoryGetter,);
    this.registerInclusionResolver('conjunto', this.conjunto.inclusionResolver);
    this.apartamento = this.createBelongsToAccessorFor('apartamento', apartamentoRepositoryGetter,);
    this.registerInclusionResolver('apartamento', this.apartamento.inclusionResolver);
  }
}
