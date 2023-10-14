import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Record } from '@prisma/client/runtime/library';
import { GoogleAuthGuard } from './guards/google.guard';

@Controller({ version: '1', path: 'auth' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleGoogle() {
    return 'idk';
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleGoogleRedirect() {
    return { message: 'OK' };
  }

  @Post('/register')
  completeRegister(
    @Query('token') token: string,
    @Body() passwordDto: Record<string, string>,
  ) {
    const { password } = passwordDto;
    return this.authService.registerPassword(token, password);
  }
}
