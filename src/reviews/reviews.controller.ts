import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthenticateGuard } from 'src/shared/guards/authenticate.gurad';
import { AuthorizationGuard } from 'src/shared/guards/authorization.guard';
import { UserRole } from 'src/shared/common/user-role.enum';
import { CurrentUserDecorator } from 'src/shared/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ReviewEntity } from './entities/review.entity';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(AuthenticateGuard, AuthorizationGuard([UserRole.ADMIN, UserRole.CUSTOMER]))
  @Post()
  async create(@Body() createReviewDto: CreateReviewDto, @CurrentUserDecorator() currentUser : UserEntity): Promise<ReviewEntity> {
    return await this.reviewsService.create(createReviewDto, currentUser);
  }

  @Get('all')
  async findAll() {
    return await this.reviewsService.findAll();
  }

  @Get()
  async findAllByProduct(@Body('productId') { productId }: { productId: number }) {
    return await this.reviewsService.findAllByProduct(+productId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReviewEntity> {
    return await this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

   @UseGuards(AuthenticateGuard, AuthorizationGuard([UserRole.CUSTOMER]))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.reviewsService.remove(+id);
  }
}
