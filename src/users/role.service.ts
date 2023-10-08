import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export interface RoleGetAllParams {
  skip?: number;
  take?: number;
  cursor?: Prisma.RoleWhereUniqueInput;
  where?: Prisma.RoleWhereInput;
  orderBy?: Prisma.RoleOrderByWithRelationInput;
}

export interface RoleUpdateParams {
  where: Prisma.RoleWhereUniqueInput;
  data: Prisma.RoleUpdateInput;
}

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.RoleCreateInput): Promise<Role> {
    return this.prisma.role.create({ data });
  }

  findAll(params: RoleGetAllParams): Promise<Role[]> {
    return this.prisma.role.findMany(params);
  }

  findOne(key: Prisma.RoleWhereUniqueInput): Promise<Role | null> {
    return this.prisma.role.findUnique({ where: key });
  }

  update(params: RoleUpdateParams): Promise<Role> {
    return this.prisma.role.update(params);
  }

  async remove(key: Prisma.RoleWhereUniqueInput): Promise<Role | null> {
    return this.findOne(key).then((role) => {
      if (role === null) return null;

      role.state = false;
      return this.update({ data: role, where: key });
    });
  }
}
