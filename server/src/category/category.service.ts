import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';
import { Book, BookDocument } from '../schemas/book.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryModel.findById(id).exec();
  }

  async getCategoryWithBooks(id: string, currentPage: number): Promise<any> {
    const category = await this.findOne(id);
    const limit = 12;

    const totalBooks = await this.bookModel
      .countDocuments({ cat_id: id })
      .exec();
    const totalPages = Math.ceil(totalBooks / limit);

    const books = await this.bookModel
      .find({ cat_id: id })
      .skip((currentPage - 1) * limit)
      .limit(limit)
      .exec();

    return { category, books, currentPage, totalPages };
  }
}
