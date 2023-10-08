import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { RolesController } from './role.controller';
import { RolesService } from './role.service';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';

@Module({
  controllers: [UsersController, RolesController],
  providers: [UsersService, RolesService, PrismaService, EmailService],
  exports: [UsersService],
  imports: [PrismaModule, EmailModule],
})
export class UsersModule {}
