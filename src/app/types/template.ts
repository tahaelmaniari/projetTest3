import {Attachment} from "./attachment";
import {Application} from "./application";
import {TypeDemande} from "./typeDemande";

export interface Template {
  id?: string;
  name: string;
  baseName?: string;
  idDocument?: string;
  title?: string;
  applications: Application;
  typeDemandes: TypeDemande;
}
