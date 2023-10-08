import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class EmailService {
  constructor(@InjectQueue('sendEmails') private readonly emailsQueue: Queue) {}

  async send(to: string) {
    this.emailsQueue.add('sendConfirmation', { email: to });
    return 'http://localhost:3000/v1/auth/register?token=' + to;
  }
}
