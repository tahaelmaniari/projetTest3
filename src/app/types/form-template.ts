import {Application} from "./application";

export interface FormTemplate {
  id_aft:string
  index:number|undefined
  templateNm: string
  templateID: string
  inputTp: string
  label: string
  placeholder: any
  formCtlName: string
  typeDemandeId:string
  applicationList:any
  validators: Validator[]
}


export interface Validator {
  valType: string
  valSubType:any
  description:string
  valValue: any
}
