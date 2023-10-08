import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export interface UserGetAllParams {
  skip?: number;
  take?: number;
  cursor?: Prisma.UserWhereUniqueInput;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
}

export interface UserUpdateParams {
  where: Prisma.UserWhereUniqueInput;
  data: Prisma.UserUpdateInput;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  findAll(params: UserGetAllParams): Promise<User[]> {
    return this.prisma.user.findMany(params);
  }

  findOne(key: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: key,
      include: { role: true },
    });
  }

  update(params: UserUpdateParams): Promise<User> {
    return this.prisma.user.update(params);
  }

  async remove(key: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({ where: key }).then((user) => {
      if (user === null) return null;

      user.state = false;
      return this.update({ data: user, where: key });
    });
  }
}
