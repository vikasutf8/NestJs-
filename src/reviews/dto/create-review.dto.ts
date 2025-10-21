import { IsNotEmpty, IsNumber, IsString } from "class-validator";



export class CreateReviewDto {

    @IsNotEmpty({message:'Product Id is required'})
    @IsNumber({},{message:'Product Id must be a number'})
    productId: number;

    @IsNotEmpty({message:'Rating is required'})
    @IsNumber({},{message:'Rating must be a number'})
    rating: number;
    

    @IsString({message:'Comment must be a string'})
    comment: string;
}
