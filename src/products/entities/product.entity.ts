import { CategoryEntity } from "src/categories/entities/category.entity";
import { OrderEntity } from "src/orders/entities/order.entity";
import { OrdersProductsEntity } from "src/orders/entities/orders-products.entity";
import { ReviewEntity } from "src/reviews/entities/review.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";


@Entity({name:'products'})
export class ProductEntity {

    id: number;

    name: string;
    
    description: string;

    @Column({type:'decimal', precision:10, scale:2 ,default:0})
    price : number;

    stock : number;

    @Column("simple-array")
    images : string[];

    @CreateDateColumn()
    createdAt : Date;
    
    @UpdateDateColumn()
    updatedAt : Date;

    @ManyToOne(()=>UserEntity,(user)=>user.products)
    addedBy : UserEntity;

    @ManyToOne(()=>CategoryEntity,(cat)=>cat.products)
    category : CategoryEntity;

    @OneToMany(type=> ReviewEntity, review => review.product)
    reviews: ReviewEntity[];

    @OneToMany(() => OrdersProductsEntity, (order) => order.product)
    products: OrdersProductsEntity[];

}
