import {TypeDemande} from "./typeDemande";
import {Application} from "./application";
import {Attachment} from "./attachment";
import {Task} from "./Task";

export interface Criteria {
  id?: string;
  typeDemande?: TypeDemande;
  initiationDate?: Date;
  closeDate?: Date;
  initiator?: any;
  searcher?: string;
  initiatorLastName?: string;
  initiatorFirstName?: string;
  assigneeLastName?: string;
  assigneeFirstName?: string;
  assignee?: any;
  application?: Application;
  decision?: string;
  processInstanceId?: string;
  currentActivityId?: string;
  currentActivityName?: string;
  reference?: string;
  rejectReason?: string;
  status: string[];
  attachments?: Attachment[];
  tasks?: Task[];
  page?: string;
  initiationFrom?: Date
  initiationTo?: Date
}
