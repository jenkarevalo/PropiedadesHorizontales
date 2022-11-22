import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Factura } from '../models/factura.model';
import { FacturaRepository } from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class FacturaService {
  constructor(
    @repository(FacturaRepository)
    public facturaRepository: FacturaRepository

  ) {}

  getNotasDb(): Promise<Factura[]> {
    let factura = this.facturaRepository.find({
      where:{
        tipoNota:"Debito"
      }
    });
    return factura;
  }
    
  getNotasCr(): Promise<Factura[]> {
    let factura = this.facturaRepository.find({
      where:{
        tipoNota:"Credito"
      }
    });
    return factura;
  }



   
}
