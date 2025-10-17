import { IsNotEmpty, IsString } from "class-validator";


export class CreateCategoryDto {
    @IsNotEmpty({message:'Title is required'})
    @IsString({message:'Title must be a string'})
    title : string;

    @IsString({message:'Discription must be a string'})
    discription : string;
}
