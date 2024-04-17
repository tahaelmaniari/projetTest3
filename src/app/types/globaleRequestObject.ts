import {PanierApplication} from "./panierApplication";
import {Request} from "./request";

export interface GlobaleRequestObject {
  requestDto:Request
  basketList:PanierApplication[]

}
