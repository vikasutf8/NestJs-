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

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthenticateGuard, AuthorizationGuard([UserRole.SELLER]))
  @Post()
  async create(@Body() createProductDto: CreateProductDto,@CurrentUserDecorator() currentUser: UserEntity) {

  

    return await this.productsService.create(createProductDto,currentUser);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
