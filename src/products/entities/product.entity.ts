import { CategoryEntity } from "src/categories/entities/category.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, UpdateDateColumn } from "typeorm";


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

}
