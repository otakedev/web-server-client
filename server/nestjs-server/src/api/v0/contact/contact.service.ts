import { HttpException, Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sendpulse = require('sendpulse-api');
import { ContactInput } from './dto/contact-input.model';

require('dotenv').config();

@Injectable()
export class ContactService {
  constructor() {
    sendpulse.init(
      process.env.SEND_PULSE_API_USER_ID,
      process.env.SEND_PULSE_API_SECRET,
      process.env.SEND_PULSE_TOKEN_STORAGE,
      (data) => {
        // this console print nothing if we don't have error
        console.log(data);
      },
    );
  }

  async sendMail(body: ContactInput) {
    const mailOptionsUser = {
      text: `Hi ${body.firstname} ${body.lastname},\nWe have received your contact request. An administrator will get back to you as soon as possible.\n\nAs a reminder, here is your message:\n${body.message}`,
      subject: 'Your contact request',
      from: {
        name: 'Otake',
        email: 'contact@otakedev.com',
      },
      to: [
        {
          email: body.email,
        },
      ],
    };
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await sendpulse.smtpSendMail(() => {}, mailOptionsUser);
  }
}
