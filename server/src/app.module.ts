import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { Book, BookSchema } from './schemas/book.schema';
import { Category, CategorySchema } from './schemas/category.schema';
import { CategoryModule } from './category/category.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/f8_education'),
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    AuthModule,
    HomeModule,
    CategoryModule,
    BookModule,
  ],
})
export class AppModule {}
