import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrdersProductsEntity } from './entities/orders-products.entity';
import { ShippingEntity } from './entities/shipping.entity';
import { ProductsService } from 'src/products/products.service';
import { ProductEntity } from 'src/products/entities/product.entity';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderStatus } from './enums/orderStatus.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrdersProductsEntity)
    private readonly orderedProductRepository: Repository<OrdersProductsEntity>,
    private readonly productService :ProductsService
  ) {}

  async create(createOrderDto: CreateOrderDto, currentUser: UserEntity) {
    const shippingEntity = new ShippingEntity();

    Object.assign(shippingEntity, createOrderDto.shippingAddres);

    const orderEntity = new OrderEntity();
    orderEntity.shippingAddress = shippingEntity;
    orderEntity.userCreated = currentUser;

    const ordersTbl = await this.orderRepository.save(orderEntity);

    let orderedProductEntity: {
      order: OrderEntity
      product: ProductEntity
      product_quantity: number;
      product_unit_price: number;
    }[] = [];

    for (let i = 0; i < createOrderDto.orderedProducts.length; i++) {
      const order = ordersTbl
      const product = await this.productService.findOne(createOrderDto.orderedProducts[i].id)
      const product_quantity =
        createOrderDto.orderedProducts[i].product_quantity;
      const product_unit_price =
        createOrderDto.orderedProducts[i].product_unit_price;

      orderedProductEntity.push({
        order,
        product,
        product_quantity,
        product_unit_price,
      });
    }

    const orderedProducts = await this.orderedProductRepository
      .createQueryBuilder()
      .insert()
      .into(OrdersProductsEntity)
      .values(orderedProductEntity)
      .execute();

    // return not all
    return await this.findOne(ordersTbl.id)
  }

  async findAll() {
     return await this.orderRepository.find({
      relations: {
        shippingAddress: true,
        user: true,
        products: {product:true}
      },
    });
  }

  async findOne(id: number) {
    return await this.orderRepository.findOne({
      where: { id },
      relations: {
        shippingAddress: true,
        user: true,
        products: {product:true}
      },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto, updateOrderStatusDto : UpdateOrderStatusDto , currentUser :UserEntity) {
    
    let order =await this.findOne(id);
    if(!order) throw new NotFoundException('order Not present')

    if(order.status === OrderStatus.DELIVERED || order.status === OrderStatus.CANCELLED){
      throw new BadRequestException("order status done")
    }

    if(order.status === OrderStatus.PROCESSING && updateOrderStatusDto.status != OrderStatus.SHIPPED){
      throw new BadRequestException('Impossible')
    }

    if(updateOrderStatusDto.status === OrderStatus.SHIPPED && order.status === OrderStatus.SHIPPED){
     return order;
    }

    if(updateOrderStatusDto.status === OrderStatus.SHIPPED){
      order.shippedAt =new Date();
    }

    if(updateOrderStatusDto.status === OrderStatus.DELIVERED){
      order.deliveredAt =new Date();
    }

    order.status = updateOrderStatusDto.status;
    order.user =currentUser;
    order =await this.orderRepository.save(order)

    if(updateOrderStatusDto.status ===OrderStatus.DELIVERED){
      await this.stockUpdate(order,OrderStatus.DELIVERED);
    }
    return order;

  }

  async stockUpdate(order: OrderEntity, status :string){
      for(const op  of order.products){
          await this.productService.updateStock(op.product.id,op.product_quantity,status)
      }
  }


  async cancelled(id :number,currentUser : UserEntity){
    let order =await this.findOne(id);
    if(!order) throw new NotFoundException('order Not present')

    if( order.status === OrderStatus.CANCELLED){
     return order;
    }

    order.status =OrderStatus.CANCELLED;
    order.user =currentUser;
    order =await this.orderRepository.save(order);

    await this.stockUpdate(order,OrderStatus.CANCELLED);
    return order;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
