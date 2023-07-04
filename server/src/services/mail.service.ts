import { createTransport } from "nodemailer";

export default class MailService {
  static transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "0"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  static async sendActivationMail(userEmail: string, userUuid: string) {
    return await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: userEmail,
      subject: `Активация аккаунта в ${process.env.CLIENT_URL}`,
      text: "",
      html: `
        <div>
          <h1>Для активации перейдите по ссылке</h1>
          <a href="${process.env.SERVER_URL + "/api/users/activate/" + userUuid}">${process.env.SERVER_URL + "/api/users/activate/" + userUuid}</a>
        </div>
      `,
    });
  }
}
