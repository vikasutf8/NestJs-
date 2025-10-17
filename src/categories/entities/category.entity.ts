import { ProductEntity } from "src/products/entities/product.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'categories'})
export class CategoryEntity {

    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    title : string;

    @Column()
    discription : string;

    @CreateDateColumn()
    createdAt : Date;

    @UpdateDateColumn()
    updatedAt : Date;

    @ManyToOne(()=>UserEntity,(user)=>user.categories)
    addedBy : UserEntity;


    @OneToMany(()=>ProductEntity,(product)=>product.category)
    products : ProductEntity[];
}
