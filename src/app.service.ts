import { Injectable } from '@nestjs/common';
import { Public } from './auth/decorators/public.decorator';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
