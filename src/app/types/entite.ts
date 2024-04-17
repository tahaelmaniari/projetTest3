import {Application} from "./application";

export interface Entite {
  id?: string;
  code: string;
  libelle: string;
  applications?: Application[];
}
