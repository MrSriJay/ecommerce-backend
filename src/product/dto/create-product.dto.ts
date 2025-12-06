import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'MacBook Pro 16"', description: 'Name of the product' })
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty({ example: 'High-end laptop with M2 chip', required: false })
  @IsString()
  @IsOptional()
  productDescription?: string;
}