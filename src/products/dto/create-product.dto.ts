import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty({message:'Product name is required'})
    @IsString({message:'Product name must be a string'})
    name : string;

    @IsNotEmpty({message:'Product description is required'})
    @IsString({message:'Product description must be a string'})
    description : string;

    @IsNotEmpty({message:'Product price is required'})
    @IsNumber({maxDecimalPlaces:2},{message:'Product price must be a number'})
    @IsPositive({message:'Product price must be positive'})
    price : number;

    @IsNotEmpty({message:'Product stock is required'})
    @IsNumber({}, {message:'Product stock must be a number'})
    @Min(0,{message:'Product stock must be positive'})
    stock : number;

    @IsNotEmpty({message:'Product images are required'})
    @IsArray({message:'Product images must be an array of strings'})
    images : string[];

    @IsNotEmpty({message:'Product category is required'})
    @IsNumber({}, {message:'Product category must be a number'})
    categoryId : number;
}
