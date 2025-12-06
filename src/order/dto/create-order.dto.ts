// backend/src/order/dto/create-order.dto.ts
import { IsString, IsNotEmpty, IsArray, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Description of the order',
    example: 'Order for Customer John Doe - Urgent',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  orderDescription: string;

  @ApiProperty({
    description: 'List of product IDs to include in the order',
    example: [1, 3, 4],
    type: [Number],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @Min(1, { each: true })
  productIds: number[];
}