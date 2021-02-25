import { HttpException, Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sendpulse = require('sendpulse-api');
import { ContactInput } from './dto/contact-input.model';

const checkDotEnvVariables = () => {
  let errors = '';
  [
    'SEND_PULSE_API_USER_ID',
    'SEND_PULSE_API_SECRET',
    'SEND_PULSE_TOKEN_STORAGE',
    'OTAKE_EMAIL',
    'OTAKE_NAME'
  ]
    .forEach(key => {
      if (!process.env[key]) {
        errors += `\n${key.replace(/\_/g, ' ').toLocaleLowerCase()} not set, make sure to create a .env with a key : ${key}`
      }
    });
  if (errors != '') {
    throw new Error(`INVALID ENV VAR : ${errors}`);
  }
};

@Injectable()
export class ContactService {
  constructor() {
    checkDotEnvVariables();

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
        name: process.env.OTAKE_NAME,
        email: process.env.OTAKE_EMAIL,
      },
      to: [
        {
          email: body.email,
        },
      ],
    };
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await sendpulse.smtpSendMail(() => { }, mailOptionsUser);
  }
}
