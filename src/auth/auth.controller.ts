import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  // change this to a real dto
  async signIn(@Res() res, @Body() signInDto: Record<string, any>) {
    const result = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );
    res.cookie('jwt', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 15, // 15 min
    });

    res.send({ username: result.username, role: result.role });
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
