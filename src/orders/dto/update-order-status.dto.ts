import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { OrderStatus } from "../enums/orderStatus.enum";


export class UpdateOrderStatusDto{
    @IsNotEmpty()
    @IsString()
    @IsIn([OrderStatus.SHIPPED,OrderStatus.DELIVERED])
    status : OrderStatus
}