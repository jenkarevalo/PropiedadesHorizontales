import { injectable, /* inject, */ BindingScope } from '@loopback/core';
import generador from "password-generator";
const cryptoJS = require("crypto-js");

@injectable({ scope: BindingScope.TRANSIENT })
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) { }

  CifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  GenerarClave() {
    let clave = generador(8, false);
    return this.CifrarClave(clave);
  }

}
