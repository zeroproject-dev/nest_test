import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Record } from '@prisma/client/runtime/library';

@Controller({ version: '1', path: 'auth' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    console.log('akjsdhflkjah');
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('/register')
  @HttpCode(HttpStatus.NO_CONTENT)
  completeRegister(
    @Param('token') token: string,
    @Body() passwordDto: Record<string, string>,
  ) {
    // const { password } = passwordDto;
  }
}
