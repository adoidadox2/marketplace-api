import { Options } from "nodemailer/lib/mailer";

export default interface SendMailDTO extends Options {
  template: string;
}
