import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class CategoriesService {

  constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository :Repository<CategoryEntity>) {}

  async create(createCategoryDto: CreateCategoryDto, currentUser :UserEntity) : Promise<CategoryEntity>{
    const category = this.categoryRepository.create(createCategoryDto);
    category.addedBy = currentUser;
    return await this.categoryRepository.save(category);
  }

  async findAll() {
    return  await this.categoryRepository.find();
  }

  async findOne(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['addedBy'],
      select:{
        addedBy:{
          id:true,
          email:true,
          name:true
        }
      }
    });

    if(!category){
      throw new NotAcceptableException('Category not found');
    }

    return category;
  }

  async update(id: number, field: Partial<UpdateCategoryDto>) {
      const isCategory =await this.findOne(id);

      if(!isCategory){
        throw new NotAcceptableException('Category not found');
      }

      Object.assign(isCategory, field);

      return await this.categoryRepository.save(isCategory); 
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
