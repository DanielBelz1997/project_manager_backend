import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async findAllUsers(params: {
    skip?: number;
    take?: number;
    cursor?: { id: number };
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip = 0, take = 10, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor: cursor ? { id: cursor.id } : undefined,
      where,
      orderBy,
    });
  }

  async findOneUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: {
        users_groups_permissions: {
          select: {
            permission_id: true,
          },
        },
      },
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
