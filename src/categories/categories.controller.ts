import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CurrentUserDecorator } from 'src/shared/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthenticateGuard } from 'src/shared/guards/authenticate.gurad';
import { AuthorizeRoles } from 'src/shared/decorators/authorize-role.decorator';
import { UserRole } from 'src/shared/common/user-role.enum';
import { CategoryEntity } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AuthenticateGuard, AuthorizeRoles(UserRole.SELLER, UserRole.ADMIN))
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @CurrentUserDecorator() currentUser: UserEntity) :Promise<CategoryEntity>{
    return  await this.categoriesService.create(createCategoryDto, currentUser);
  }

  @Get()
  async findAll() {
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) : Promise<CategoryEntity> {
    return  await this.categoriesService.findOne(+id);
  }
  @UseGuards(AuthenticateGuard, AuthorizeRoles(UserRole.SELLER, UserRole.ADMIN))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() field: Partial<UpdateCategoryDto>) {
    return await this.categoriesService.update(+id, field);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
