import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from 'src/logger/logger.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  private readonly logger = new LoggerService(AuthService.name);

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string; username: string; role: number }> {
    const user = await this.userService.findOneUser({ email: email });
    if (user?.password !== password) {
      throw new UnauthorizedException();
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
