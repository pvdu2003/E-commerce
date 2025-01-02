import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { Book, BookSchema } from './schemas/book.schema';
import { Category, CategorySchema } from './schemas/category.schema';
import { CategoryModule } from './category/category.module';
import { BookModule } from './book/book.module';
import { CartModule } from './cart/cart.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    AuthModule,
    HomeModule,
    CategoryModule,
    BookModule,
    CartModule,
    UserModule,
  ],
})
export class AppModule {}
