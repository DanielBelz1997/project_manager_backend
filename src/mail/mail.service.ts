import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailingService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(
      {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: process.env.MAILER_SECURE === 'true',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      {
        from: {
          name: 'No-reply',
          address: process.env.MAIL_FROM,
        },
      },
    );
  }

  async sendUserConfirmation(user: any, token: string) {
    const url = `${process.env.CLIENT_URL}?token=${token}`;

    await this.transporter.sendMail({
      to: user.email,
      subject: 'Welcome user! Confirm your Email',
      text: `hello, click here: ${url}`,
    });
  }

  // Other email sending methods...
}
