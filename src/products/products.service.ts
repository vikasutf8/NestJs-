import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { CurrentUserDecorator } from 'src/shared/decorators/current-user.decorator';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto, currentUser:UserEntity) {
    const category = await this.categoriesService.findOne(
      +createProductDto.categoryId,
    );
    if(!category){
      throw new NotFoundException('Category not found');
    }
    const product = this.productRepository.create(createProductDto);
    product.category = category;
    product.addedBy = currentUser;

    return await this.productRepository.save(product);
  }



  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(
      {
        where:{id},
        relations:{
          category:true,
          addedBy:true
        },
        select:{
          addedBy:{
            id:true,
            name:true,
            email:true
          },
          category:{
            id:true,
            title:true,
            discription:true
          }
        }
    
    });

    if(!product){
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: number, updateProductDto: Partial<UpdateProductDto>, currentUser: UserEntity):Promise<ProductEntity> {
    const prodExist =await this.findOne(id);

    if(!prodExist){
      throw new NotFoundException('Product not found');
    }

    Object.assign(prodExist, updateProductDto)
    prodExist.addedBy= currentUser;

    if(updateProductDto.categoryId){
      const category = await this.categoriesService.findOne(
        +updateProductDto.categoryId,
      )
      prodExist.category= category;
    }
    return await this.productRepository.save(prodExist);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
