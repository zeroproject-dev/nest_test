import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailService } from 'src/email/email.service';

@Controller({ version: '1', path: 'users' })
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const { role_id, ...rest } = createUserDto;

    try {
      const user = await this.usersService.create({
        ...rest,
        role: { connect: { id: role_id } },
        password: null,
      });

      const url = await this.emailService.send(user.email);

      return { url, user };
    } catch (error) {
      throw new HttpException(
        'Error al crear el usuario',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  @Get() async findAll() {
    return await this.usersService.findAll({ where: { state: true } });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne({ id: id });

    if (user === null)
      throw new HttpException('Usuario desconocido', HttpStatus.NOT_FOUND);

    return user;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update({
      data: updateUserDto,
      where: { id },
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.usersService.remove({ id });
  }
}
