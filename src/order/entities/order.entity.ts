// backend/src/order/entities/order.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { OrderProductMap } from './order-product-map.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  orderDescription: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;


  @OneToMany(() => OrderProductMap, (map) => map.order, { cascade: true })

  orderProducts: OrderProductMap[];
  
}