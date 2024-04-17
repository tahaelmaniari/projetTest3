import {Request} from "./request";
export interface RequestPage {
  requests: Request[];
  totalItems: number;
}
