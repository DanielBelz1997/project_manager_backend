import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { DatabaseModule } from 'src/database/database.module';
import { MailingModule } from 'src/mail/mail.module';

@Module({
  imports: [DatabaseModule, MailingModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
