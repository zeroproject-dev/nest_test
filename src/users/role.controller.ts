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
import { RolesService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller({ version: '1', path: 'roles' })
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() roleDto: CreateRoleDto) {
    try {
      return await this.rolesService.create(roleDto);
    } catch (error) {
      throw new HttpException(
        'Error al crear el rol',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  @Get() async findAll() {
    return await this.rolesService.findAll({ where: { state: true } });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const role = await this.rolesService.findOne({ id: id });
    if (role === null)
      throw new HttpException('Rol desconocido', HttpStatus.NOT_FOUND);

    return role;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() roleDto: UpdateRoleDto,
  ) {
    return await this.rolesService.update({
      data: roleDto,
      where: { id },
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.rolesService.remove({ id });
  }
}
