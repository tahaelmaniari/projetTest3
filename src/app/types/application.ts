import {Template} from "./template";
import {RoleApplicatif} from "./role-applicatif";
import {TypeDemande} from "./typeDemande";

export interface Application {
  id?: string;
  name: string;
  description: string;
  typeDemandeList :TypeDemande[]
  roleApplicatifList:RoleApplicatif[]

}
