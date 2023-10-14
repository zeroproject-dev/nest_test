import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    PrismaModule,
    EmailModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, EmailService],
})
export class AppModule {}
