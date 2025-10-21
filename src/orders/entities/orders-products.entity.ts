import { Column, Entity, ManyToOne } from "typeorm";
import { OrderEntity } from "./order.entity";
import { ProductEntity } from "src/products/entities/product.entity";



@Entity({name : 'orders_products'})
export class OrdersProductsEntity {
    

    id : number;

    @Column({type:'decimal',precision:10, scale:2,default:0})
    product_unit_price : number;

    @Column()
    product_quantity : number;

    @ManyToOne(() => OrderEntity, (order) => order.products)
    order: OrderEntity;

    @ManyToOne(() => ProductEntity, (order) => order.products,{cascade:true})
    product: ProductEntity


}