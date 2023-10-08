import { Process } from '@nestjs/bull';
import { Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('sendEmails')
export class SendEmailProcessor {
  constructor() {}

  @Process('sendConfirmation')
  async handleEmail(job: Job) {
    // TODO: Mailer to send emails
    return 'http://localhost:3000/v1/auth/register?token=' + job.data.email;
  }
}
