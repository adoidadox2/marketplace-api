import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import exphbs from "express-handlebars";
import mailConfig from "../config/mailConfig";

const transport = nodemailer.createTransport(mailConfig);

transport.use(
  "compile",
  hbs({
    viewEngine: exphbs.create({
      partialsDir: "src/views/emails/partials",
      defaultLayout: undefined,
    }),
    viewPath: "src/views/emails",
    extName: ".hbs",
  })
);

export default transport;
