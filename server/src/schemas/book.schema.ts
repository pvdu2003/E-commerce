import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongooseDelete from 'mongoose-delete';
import { Category } from './category.schema';
export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true, unique: true })
  isbn: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true, minLength: 20 })
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  published_date: Date;

  @Prop({ required: true })
  publisher: string;

  @Prop({ required: true })
  quantity_import: number;

  @Prop({ required: true })
  quantity_in_stock: number;

  @Prop({ default: 0 })
  quantity_sold: number;

  @Prop({ required: true })
  title: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  cat_id: Category;
}

export const BookSchema = SchemaFactory.createForClass(Book);

// Add mongoose-delete plugin
BookSchema.plugin(mongooseDelete, {
  indexFields: 'all',
  overrideMethods: 'all',
});
