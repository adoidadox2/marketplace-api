import mailService from "../services/mailService";

class PurchaseMail {
  get key(): string {
    return "PurchaseMailKey";
  }

  async handle(job, done) {
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
    });

    return done();
  }
}

export default new PurchaseMail();
