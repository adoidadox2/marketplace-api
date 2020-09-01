import mailService from "../services/mailService";
import PurchaseMailJobDTO from "../dtos/PurchaseMailJobDTO";
import SendMailDTO from "../dtos/SendMailDTO";

class PurchaseMail {
  get key(): string {
    return "PurchaseMailKey";
  }

  async handle(job: PurchaseMailJobDTO, done: any) {
    const { ad, user, content } = job.data;

    await mailService.sendMail({
      from: '"Gerenciamento de Vendas" <contato@marketplace-api.com>',
      to: ad.author.email,
      replyTo: user.email,
      subject: `Solicitação de compra: ${ad.title}`,
      template: "purchase",
      context: {
        user,
        content,
        ad,
      },
    } as SendMailDTO);

    return done();
  }
}

export default new PurchaseMail();
