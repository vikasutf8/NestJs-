import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateOrderedProductsDto{
    
    @IsNotEmpty({message:"Product should be selected"})
    id : number

    @IsNumber({maxDecimalPlaces:2},{message:"product should be number and max decimal 2"})
    @IsPositive({message:"Price should be positive"})
    product_unit_price : number;

    @IsNumber({},{message:"Qunity in Numbers"})
    @IsPositive({message:"Qunatity should be positive"})
    product_quantity :number ;
}