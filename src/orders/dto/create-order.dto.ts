import { Type } from "class-transformer";
import { isString, ValidateNested } from "class-validator";
import { Timestamp } from "typeorm";
import { CreateShippingDto } from "./create-shipping.dto";
import { OrdersProductsEntity } from "../entities/orders-products.entity";
import { CreateOrderedProductsDto } from "./create-ordered-products.dto";

export class CreateOrderDto {


    // orderAt :Timestamp

    // status :string;

    // shippedAt :Date;

    // deliveredAt :Date;

    @Type(()=> CreateShippingDto)
    @ValidateNested()
    shippingAddres : CreateShippingDto;

    @Type(()=>CreateOrderedProductsDto)
    @ValidateNested()
    orderedProducts : CreateOrderedProductsDto[];


}
