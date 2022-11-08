import { AuthenticationStrategy } from "@loopback/authentication";
import { service } from "@loopback/core";
import { Request, RedirectRoute, HttpErrors } from "@loopback/rest";
import { UserProfile } from "@loopback/security";
import { ParamsDictionary } from "express-serve-static-core";
import parseBearerToken from "parse-bearer-token";
import { ParsedQs } from "qs";
import { AutenticacionService } from "../services";

export class EstrategiaConjunto implements AuthenticationStrategy{
    name: string = 'conjunto';
    
    constructor(
        @service(AutenticacionService)
        public serviceAutenticacion: AutenticacionService
    ) {}
    async authenticate(request: Request): Promise<UserProfile | RedirectRoute | undefined> {
        //verificar si el inicio del usuario existe en la BDS
        let token = parseBearerToken(request);
        if(token){
            let datos = this.serviceAutenticacion.validarTokenJWTc(token);
            if (datos){
                let perfil: UserProfile = Object.assign({
                    nombre: datos.data.nombreAdministrador
                });
                return perfil;

            }else{
                throw new HttpErrors[403]('No tiene permisos para hacer el llamado del servicio');
            }      
        }else{
         throw new HttpErrors[401]('No se ha generado el token')
        } 
    }
}