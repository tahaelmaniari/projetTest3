import {Attachment} from "./attachment";
import {Task} from "./Task";
import {User} from "./user";
import {Application} from "./application";
import {TypeDemande} from "./typeDemande";
export interface Request {
  id?: string;
  typeDemande: TypeDemande;
  initiationDate?: string;
  closeDate?: string;
  initiator: User;
  assigneeName?: string;
  assignee: User;
  application: Application;
  decision?: string;
  processInstanceId?: string;
  currentActivityId?: string;
  currentActivityName?: string;
  reference?: string;
  message?: string;
  status?: string;

  tasks?: Task[];
  panierListIdCommaSeparated:string

}
