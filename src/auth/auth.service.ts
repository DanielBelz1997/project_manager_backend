import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from 'src/logger/logger.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  private readonly logger = new LoggerService(AuthService.name);

  async validatePassword(rawPassword: string, hashPassword: string) {
    return await bcrypt.compare(rawPassword, hashPassword);
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async signUp({
    firstName,
    lastName,
    username,
    email,
    password,
    phoneNumber,
    avatar_url,
  }: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
    avatar_url: string;
  }) {
    const hashPassword = await this.hashPassword(password);

    const newUser = await this.userService.createUser({
      first_name: firstName,
      last_name: lastName,
      username: username,
      email: email,
      password: hashPassword,
      phone_number: phoneNumber,
      avatar_url: avatar_url,
    });

    return newUser;
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string; username: string; role: number }> {
    const user = await this.userService.findOneUser({ email: email });
    if (!user) {
      this.logger.warn(`Failed login with user for email ${email}`);
      throw new UnauthorizedException('Invalid name or Password');
    }

    const isPasswordValid = await this.validatePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      this.logger.warn(`Failed login with password attempt for email ${email}`);
      throw new UnauthorizedException('Invalid name or password');
    }

    const payload = { sub: user.id, username: user.username };

    this.logger.log(`the user with email ${email} logged in successfully`);

    return {
      access_token: await this.jwtService.signAsync(payload),
      username: user.username,
      role: user.users_groups_permissions[0]?.permission_id,
    };
  }
}
