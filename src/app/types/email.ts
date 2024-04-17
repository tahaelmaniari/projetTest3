export interface Email {
  id: number;
  guid: string;
  reference: string;
  subject: string;
  body: string;
  tos:string;
  ccs: string;
  html: boolean;
  bccs: string;
  sendDate: Date;
  requestDate: Date;
  application: string;
  domain: string;
  plateform: string;
  from: string;
  priority: number;
  bodyTemplateId: string;
  subjectTemplateId: string;
  relatedId: string;

  attachementIds: string[];
}
