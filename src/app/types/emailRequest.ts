import {Email} from "./email";

export interface EmailRequest {
  action: string;
  reference: string;
  application: string;
  email: Email;
  synchrone: boolean;
}
