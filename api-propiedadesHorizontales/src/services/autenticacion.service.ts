
import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import generador from "password-generator";
import { llaves } from '../config/llaves';
import { Propietario } from '../models';
import { PropietarioRepository } from '../repositories';
import { Conjunto } from '../models';
import { ConjuntoRepository } from '../repositories';

const cryptoJS = require ("crypto-js");
const jwt = require ('jsonwebtoken');


@injectable({ scope: BindingScope.TRANSIENT })
export class AutenticacionService {

  constructor(
    @repository(PropietarioRepository) 
    public propietarioRepository : PropietarioRepository,
    @repository(ConjuntoRepository) 
    public conjuntoRepository : ConjuntoRepository,
  ) {}


  CifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  GenerarClave() {
    let clave = generador(8, false);
    return this.CifrarClave(clave);
  }


 validarAcceso(usuario:string, contrasenia:string ){
    try{
      let prop = this.propietarioRepository.findOne({
        where:{
          email: usuario,
          clave: contrasenia
        }
      });
      if (prop)
        return prop;

      return false;  
    } catch (error){
      return false;
   };

  };
  
  //METODO QUE GENERE TOKEN
  generarTokenJWT(propietario: Propietario){
    let token = jwt.sign({
      date: {
        id: propietario.id,
        correo: propietario.email,
        nombre: `${propietario.primerNombre} ${propietario.primerApellido}`
      }
    },
      llaves.claveJWT
    );
    return token;

  }

  validarTokenJWT(token:string){
    try{
      let datos = jwt.verify(token, llaves.claveJWT)
      return datos;
    }catch (error){
      return false;
    }
  }

  validarAccesoConjunto(usuario:string, contrasenia:string ){
    try{
      let conj = this.conjuntoRepository.findOne({
        where:{
          email: usuario,
          clave: contrasenia
        }
      });
      if (conj)
        return conj;

      return false;  
    } catch (error){
      return false;
   }

  }

  //Metodo pata generar token
  generarTokenJWTc(conjunto:Conjunto ){
    let token = jwt.sign({
      data: {
        id: conjunto.id,
        correo: conjunto.email,
        nombre: conjunto.nombreAdministrador
      }
    },
      llaves.claveJWT
    );
    return token;
  }

  validarTokenJWTc(token: string){
    try {
      let datos = jwt.verify(token, llaves.claveJWT)
      return datos;
    } catch (error) {
      return false;
    }
  }

}


