import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../product/product.entity';

@Entity('order_product_map')
export class OrderProductMap {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  order: Order;

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  orderId: number;

  @Column()
  productId: number;
}