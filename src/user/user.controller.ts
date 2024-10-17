import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
import { Prisma } from '@prisma/client';
// import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private prisma: PrismaService,
  ) {}

  @Post()
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.userService.createUser(createUserDto);
  }

  @Post('all')
  findAll(
    @Body()
    data: {
      skip?: number;
      take?: number;
      cursor?: { id: number };
      where?: Prisma.UserWhereInput;
      orderBy?: Prisma.UserOrderByWithAggregationInput;
    },
  ) {
    return this.userService.findAllUsers(data);
  }

  @Get(':id')
  findOne(@Param('id') id: Prisma.UserWhereUniqueInput) {
    return this.userService.findOneUser({ id: Number(id) });
  }

  @Patch(':id')
  update(
    @Body()
    updateUserDto: {
      where: Prisma.UserWhereUniqueInput;
      data: Prisma.UserUpdateInput;
    },
  ) {
    return this.userService.updateUser(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Prisma.UserWhereUniqueInput) {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
