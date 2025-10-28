import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all orders`;
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

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
