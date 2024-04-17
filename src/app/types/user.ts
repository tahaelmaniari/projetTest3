export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullname?: string;
  matricule: string;
  email: string;
  provenance: string;
  enabled: boolean;
  fonction:string
  entite?: string;
  createdBy?: string;
  creationTime?: string;
  matriculeManager?: string;
  delegationRegionale?: string;
  authorities: string[];
  requests?: Request[];
}
