import { Logger, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { BullModule } from '@nestjs/bull';
import { SendEmailProcessor } from './email.procesor';

@Module({
  providers: [EmailService, Logger, SendEmailProcessor],
  exports: [
    EmailService,
    BullModule.registerQueue({ name: 'sendEmails' }),
    SendEmailProcessor,
  ],
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env['REDIS_HOST'],
        port: parseInt(process.env['REDIS_PORT']),
      },
    }),
    BullModule.registerQueue({
      name: 'sendEmails',
    }),
  ],
})
export class EmailModule {}
