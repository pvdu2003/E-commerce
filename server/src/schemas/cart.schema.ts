import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ versionKey: false, timestamps: true })
export class Cart {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user_id: Types.ObjectId;

  @Prop({
    type: [
      {
        publisher: { type: String, required: true },
        books: [
          {
            book_id: { type: Types.ObjectId, ref: 'Book' },
            quantity: { type: Number, required: true },
            addedAt: { type: Date, default: Date.now },
          },
        ],
      },
    ],
  })
  carts: CartItem[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);

export interface CartItem {
  publisher: string;
  books: BookItem[];
}

export interface BookItem {
  book_id: Types.ObjectId;
  quantity: number;
  addedAt?: Date;
}
