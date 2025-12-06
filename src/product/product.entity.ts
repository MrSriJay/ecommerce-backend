import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryColumn()
  id: number;

  @Column({ length: 100 })
  productName: string;

  @Column({ type: 'text', nullable: true })
  productDescription: string;
}