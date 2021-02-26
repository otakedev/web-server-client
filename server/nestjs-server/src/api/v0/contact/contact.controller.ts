import { Body, Controller, Post } from '@nestjs/common';
import { ContactInput } from './dto/contact-input.model';
import { ContactService } from './contact.service';

@Controller()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async contact(@Body() body: ContactInput) {
    return this.contactService.sendMail(body);
  }
}
