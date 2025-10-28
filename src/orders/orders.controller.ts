import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthenticateGuard } from 'src/shared/guards/authenticate.gurad';
import { CurrentUserDecorator } from 'src/shared/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthenticateGuard)
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @CurrentUserDecorator() currentUser : UserEntity) {
    return await this.ordersService.create(createOrderDto, currentUser);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
