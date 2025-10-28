import { IsNotEmpty, IsString } from 'class-validator';

export class CreateShippingDto {
  @IsString()
  @IsNotEmpty({ message: 'Phone No is requried' })
  phone: string;
  @IsString()
  name: string;
  @IsString()
  @IsNotEmpty({ message: 'Address is requried' })
  address: string;
  @IsString()
  @IsNotEmpty({ message: 'City  is requried' })
  city: string;
 
   @IsString()
  @IsNotEmpty({ message: 'State is requried' })
  state: string;
   @IsString()
  @IsNotEmpty({ message: 'Country is requried' })
  country: string;
  @IsString()
  @IsNotEmpty({ message: 'Postcode is requried' })
  postalCode: string;
}
