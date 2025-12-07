import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  HttpCode,
  HttpStatus,
  UseGuards 
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth 
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('orders')
@Controller('orders')
@ApiBearerAuth('access-token') 
export class OrderController {
    
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiBody({ type: CreateOrderDto })
  @UseGuards(JwtAuthGuard)
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders with product count' })
  @ApiResponse({ status: 200, description: 'List of orders' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID with full product details' })
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  @ApiResponse({ status: 200, description: 'Order found' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    const order = await this.orderService.findOne(+id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing order' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 200, description: 'Order updated' })
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: CreateOrderDto) {
    const updated = await this.orderService.update(+id, dto);
    if (!updated) throw new NotFoundException('Order not found');
    return updated;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an order' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 204, description: 'Order deleted' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const deleted = await this.orderService.remove(+id);
    if (!deleted) throw new NotFoundException('Order not found');
  }

  
}

