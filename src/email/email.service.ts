import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor() {}

  send(to: string) {
    return 'http://localhost:3000/v1/auth/register?token=' + to;
  }
}
