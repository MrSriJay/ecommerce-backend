import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Order Processing API';  // You can move the logic here if needed
  }
}
