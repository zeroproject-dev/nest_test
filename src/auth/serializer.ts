import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from './auth.service';

export class SessionSerializer extends PassportSerializer {
  constructor(private authService: AuthService) {
    super();
  }

  serializeUser(user: any, done: Function) {
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.authService.validateUser(payload.email);
    return user ? done(null, user) : done(null, null);
  }
}
