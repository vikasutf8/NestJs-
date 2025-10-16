import { UserRole } from "src/shared/common/user-role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn({primaryKeyConstraintName: 'pk_user_id'})
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({type:'enum',enum:UserRole ,array:true ,default: [UserRole.CUSTOMER]})
    role: UserRole[];

}
