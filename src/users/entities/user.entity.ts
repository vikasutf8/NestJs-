import { CategoryEntity } from "src/categories/entities/category.entity";
import { ProductEntity } from "src/products/entities/product.entity";
import { ReviewEntity } from "src/reviews/entities/review.entity";
import { UserRole } from "src/shared/common/user-role.enum";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Timestamp } from "typeorm/browser";


@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn({primaryKeyConstraintName: 'pk_user_id'})
    id: number;

    @Column({unique: true})
    email: string;

    @Column({select:false})
    password: string;

    @Column()
    name: string;

    
    @Column({type:'enum',enum:UserRole ,array:true ,default: [UserRole.CUSTOMER]})
    role: UserRole[];

    @CreateDateColumn()
    createdAt: Timestamp;


    @UpdateDateColumn()
    updatedAt: Timestamp;

    @OneToMany(()=>CategoryEntity,(category)=>category.addedBy)
    categories : CategoryEntity[];


    @OneToMany(()=>ProductEntity,(product)=>product.addedBy)
    products : ProductEntity[];

    @OneToMany(type=> ReviewEntity, review => review.user)
    reviews: ReviewEntity[];

}
