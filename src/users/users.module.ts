import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { RolesController } from './role.controller';
import { RolesService } from './role.service';

@Module({
  controllers: [UsersController, RolesController],
  providers: [UsersService, RolesService, PrismaService],
  exports: [UsersService],
  imports: [PrismaModule],
})
export class UsersModule {}
