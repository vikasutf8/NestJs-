import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
}
