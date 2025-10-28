import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthenticateGuard } from 'src/shared/guards/authenticate.gurad';
import { CurrentUserDecorator } from 'src/shared/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthorizationGuard } from 'src/shared/guards/authorization.guard';
import { UserRole } from 'src/shared/common/user-role.enum';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthenticateGuard)
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @CurrentUserDecorator() currentUser : UserEntity) {
    return await this.ordersService.create(createOrderDto, currentUser);
  }

  @Get()
  async findAll() {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return  await this.ordersService.findOne(+id);
  }

  @UseGuards(AuthenticateGuard,AuthorizationGuard([UserRole.ADMIN]))
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto, updateOrderStatusDto :UpdateOrderStatusDto,@CurrentUserDecorator() currentUser : UserEntity) {
    return await this.ordersService.update(+id, updateOrderDto,updateOrderStatusDto,currentUser);
  }

  @Put(':id')
  @UseGuards(AuthenticateGuard,AuthorizationGuard([UserRole.ADMIN]))
  async cancelled(@Param('id') id: string,@CurrentUserDecorator() currentUser : UserEntity){
return await this.ordersService.cancelled(+id,currentUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
