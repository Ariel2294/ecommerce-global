import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Welcome to e-commerce global made in El Salvador by engineer Osmin Ariel López Claros!';
  }
}
