import {User} from "./user";

export interface Attachment {
  id: string
  name: string;
  user: User;
  //ged attribute
  idDocument: string;
  baseName: string;
  title: string;
}
