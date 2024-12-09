import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from '../schemas/book.schema';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async findById(id: string): Promise<Book> {
    return this.bookModel.findById(id).populate('cat_id').lean();
  }

  async findAll(query: any): Promise<{ books: Book[]; totalPages: number }> {
    const { page = 1, size = 20, from = 0, to = 150, title = '' } = query;
    const filter: any = {};

    if (from > 0 || to > 0) {
      filter.price = { $gte: from, $lte: to };
    }
    if (title) {
      filter.title = { $regex: title, $options: 'i' };
    }

    const totalBooks = await this.bookModel.countDocuments(filter);
    const books = await this.bookModel
      .find(filter)
      .skip((page - 1) * size)
      .limit(size)
      .lean();

    const totalPages = Math.ceil(totalBooks / size);
    return { books, totalPages };
  }
}
