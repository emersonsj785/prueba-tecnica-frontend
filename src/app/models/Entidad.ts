import { TipoContribuyente } from "./TipoContribuyente";
import { TipoDocumento } from "./TipoDocumento";

export class Entidad {
    id: number;
    idTipoDocumento: number;
    nroDocumento: string;
    razonSocial: string;
    nombreComercial: string;
    idTipoContribuyente: number;
    direccion: string;
    telefono: string;
    estado: number;

    //PARA TIPO DOCUMENTO
    enTipoDocumento: TipoDocumento;
    enTipoContribuyente: TipoContribuyente;
}