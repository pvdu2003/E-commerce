import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from '../schemas/book.schema';
import { Category } from '../schemas/category.schema';

@Injectable()
export class HomeService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async getTopBooksPerCategory() {
    const top5Cat = await this.bookModel.aggregate([
      {
        $group: {
          _id: '$cat_id',
          totalQuantitySold: { $sum: '$quantity_sold' },
        },
      },
      { $sort: { totalQuantitySold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $unwind: '$category' },
      {
        $project: {
          _id: '$category._id',
          name: '$category.name',
          totalQuantitySold: 1,
        },
      },
    ]);

    const topBooksPerCategory = await Promise.all(
      top5Cat.map(async (cat) => {
        const books = await this.bookModel
          .find({ cat_id: cat._id })
          .sort({ quantity_sold: -1 })
          .limit(6)
          .lean();
        return { cat_id: cat._id, category: cat.name, books: books };
      }),
    );

    return { topBooksPerCategory };
  }
}
