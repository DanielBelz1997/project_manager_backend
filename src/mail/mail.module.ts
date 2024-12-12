import { Module } from '@nestjs/common';
import { MailingService } from './mail.service';

@Module({
  providers: [MailingService],
  exports: [MailingService],
})
export class MailingModule {}
