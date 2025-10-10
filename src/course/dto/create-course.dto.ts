import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
    @IsString({ message: 'Title must be a string' })
    @IsNotEmpty({ message: 'Title is required' })
    title: string;
    @IsString({ message: 'Description must be a string' })
    @IsNotEmpty({ message: 'Description is required' })
    description: string;
    @IsNotEmpty({ message: 'Price is required' })
    @IsNumber({}, { message: 'Price must be a number' })
    price: number;
    @IsNotEmpty({ message: 'Level is required' })
    level: string;

}
