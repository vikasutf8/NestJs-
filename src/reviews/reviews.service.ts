import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { NotFoundError } from 'rxjs';
import { relative } from 'path';
import e from 'express';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewsRepository: Repository<ReviewEntity>,
    private readonly productsService: ProductsService,
  ) {}

  async create(createReviewDto: CreateReviewDto, currentUser: UserEntity): Promise<ReviewEntity> {
    const { productId, rating, comment } = createReviewDto;

    if (!productId || !rating) {
      throw new NotAcceptableException(
        'Product ID and rating are required to create a review.',
      );
    }

    const isProductExist = await this.productsService.findOne(+productId);
    if (!isProductExist) {
      throw new NotFoundError('Product not found !');
    }

    let existingReview = await this.findOnebyUserAndProduct(
      currentUser.id,
      +productId,
    );
    
    if (!existingReview) {
     existingReview = this.reviewsRepository.create(createReviewDto);
     existingReview.user = currentUser;
     existingReview.product = isProductExist;
    }
    else{
      existingReview.rating = rating;
      existingReview.comment = comment;
    }
    return this.reviewsRepository.save(existingReview);
  }

  async findOnebyUserAndProduct(userId: number, productId: number) {
    return await this.reviewsRepository.findOne({
      where: {
        user: { id: userId },
        product: { id: productId },
      },
      relations: {
        user: true,
        product: {
          category: true,
        },
      },
    });
  }

  findAll() {
    return `This action returns all reviews`;
  }

  async findOne(id: number) : Promise<ReviewEntity> {
    const review = await this.reviewsRepository.findOne({
      where: { id },
      relations: {
        user: true,
        product: {
          category: true,
        },
      },
    });
    if (!review) {
      throw new NotFoundException('Review not found !');
    }
    return review;
  }

  findAllByProduct = async (productId: number): Promise<ReviewEntity[]> => {
    const product = await this.productsService.findOne(productId);
    if (!product) {
      throw new NotFoundException('Product not found !');
    }
    return await this.reviewsRepository.find({
      where: {
        product: { id: productId },
      },
      relations: {
        user: true,
        product: {
          category: true,
        },
      },
    });
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  async remove(id: number) {
    const review =  await this.findOne(id);

    return await this.reviewsRepository.remove(review);

  }
}
