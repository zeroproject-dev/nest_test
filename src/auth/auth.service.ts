import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ username });

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async registerPassword(email: string, password: string) {
    const user = await this.usersService.findOne({ email });
    if (user === null)
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);

    user.password = password;
    delete user['role'];

    return this.usersService.update({ data: user, where: { id: user.id } });
  }
}
