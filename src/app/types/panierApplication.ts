import {Application} from "./application";
import {TypeDemande} from "./typeDemande";
import {RoleApplicatif} from "./role-applicatif";
import {BasketItem} from "./BasketItem";

export interface PanierApplication{
  panier_id : string
  type:string
  libelle:string
  basketItemList:BasketItem[]
}
