import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ContactInput } from './dto/contact-input.model';
import { ContactService } from './contact.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async contact(@Body() body: ContactInput) {
    return this.contactService.sendMail(body);
  }
}
