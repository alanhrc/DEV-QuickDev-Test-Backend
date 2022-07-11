import { IMailProvider } from '../models/IMailProvider';

export class SendMailProviderInMemory implements IMailProvider {
  public async sendMail(to: string, subject: string, body: string): Promise<void> {
    // const message = {
    //   to,
    //   from: "Teste <noreplay@teste.com>",
    //   subject,
    //   text: body,
    //   html: body
    // }

    // console.log(message)
  }
}
