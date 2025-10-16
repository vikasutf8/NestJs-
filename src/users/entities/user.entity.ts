import { UserRole } from "src/shared/common/user-role.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

}
