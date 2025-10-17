import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'db/data_source';
import { ConfigModule } from '@nestjs/config';
import { TestModule } from './test/test.module';
import { UsersModule } from './users/users.module';
import { CurrentUserMiddleware } from './shared/middleware/current-user.middleware';
import { LoggerMiddleware } from './shared/middleware/logger.middleware';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      // load: [AppDataSource],
    }),
    TestModule,
    UsersModule,
    CategoriesModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware,LoggerMiddleware)
      .forRoutes({
  path: '*',
  method: RequestMethod.ALL,
})
  }
}
