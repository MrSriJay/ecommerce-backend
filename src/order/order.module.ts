import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { OrderProductMap } from './entities/order-product-map.entity';
import { ProductModule } from '../product/product.module'; // Import here

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderProductMap]),
    ProductModule, 
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}