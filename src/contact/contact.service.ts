import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { MailingService } from 'src/mail/mail.service';

@Injectable()
export class ContactService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly mailingService: MailingService,
  ) {}

  async create(createContactDto: Prisma.ContactCreateInput) {
    await this.mailingService.sendUserConfirmation(
      createContactDto.email,
      createContactDto.name,
    );
    return this.databaseService.contact.create({
      data: createContactDto,
    });
  }

  findAll() {
    return `This action returns all contact`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  update(id: number, updateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
