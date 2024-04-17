import {RoleApplicatif} from "./role-applicatif";
import {FormHabData} from "./formHabData";

export interface BasketItem {
  basket_item_id:string
  applicaionId:string
  applicationName:string
  typeDemandeId:string
  typeDemandeName:string
  roleApplicatifList:RoleApplicatif[]
  formHabData:FormHabData
}
