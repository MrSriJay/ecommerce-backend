import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderProductMap } from './entities/order-product-map.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(OrderProductMap)
    private opmRepo: Repository<OrderProductMap>,
  ) {}

  async create(dto: CreateOrderDto) {
    const order = this.orderRepo.create({
      orderDescription: dto.orderDescription,
      orderProducts: dto.productIds.map((pid) => {
        const opm = new OrderProductMap();
        opm.productId = pid;
        return opm;
      }),
    });
    return this.orderRepo.save(order);
  }

  async findAll() {
    const orders = await this.orderRepo.find({
      relations: ['orderProducts'],
      order: { createdAt: 'DESC' },
    });

    return orders.map((o) => ({
      id: o.id,
      orderDescription: o.orderDescription,
      createdAt: o.createdAt,
      productCount: o.orderProducts.length,
    }));
  }

  async findOne(id: number) {
    return this.orderRepo.findOne({
      where: { id },
      relations: ['orderProducts', 'orderProducts.product'],
    });
  }

  async update(id: number, dto: CreateOrderDto) {
    await this.orderRepo.update(id, { orderDescription: dto.orderDescription });
    await this.opmRepo.delete({ orderId: id });

    const newMaps = dto.productIds.map((pid) => ({
      orderId: id,
      productId: pid,
    }));
    await this.opmRepo.insert(newMaps);

    return this.findOne(id);
  }


async remove(id: number) {
    const order = await this.orderRepo.findOne({
        where: { id },
        relations: ['orderProducts'], 
    });

    if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
    }

    // Step 1: Manually delete from order_product_map first
    if (order.orderProducts && order.orderProducts.length > 0) {
        await this.opmRepo.remove(order.orderProducts);
    }

    // Step 2: Now delete the order
    await this.orderRepo.remove(order);

    return { message: 'Order deleted successfully' };
    }
}