import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticateGuard } from 'src/shared/guards/authenticate.gurad';
import { AuthorizeRoles } from 'src/shared/decorators/authorize-role.decorator';
import { UserRole } from 'src/shared/common/user-role.enum';
import { AuthorizationGuard } from 'src/shared/guards/authorization.guard';
import { CurrentUserDecorator } from 'src/shared/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductEntity } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthenticateGuard, AuthorizationGuard([UserRole.SELLER]))
  @Post()
  async create(@Body() createProductDto: CreateProductDto,@CurrentUserDecorator() currentUser: UserEntity) {
    return await this.productsService.create(createProductDto,currentUser);
  }
  @Get()
  async findAll() {
    return  await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return  await this.productsService.findOne(+id);
  }

  @UseGuards(AuthenticateGuard, AuthorizationGuard([UserRole.SELLER]))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @CurrentUserDecorator() currentUser: UserEntity):Promise<ProductEntity> {
    return await  this.productsService.update(+id, updateProductDto, currentUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
