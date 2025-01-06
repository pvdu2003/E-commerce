import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument, CartItem } from '../schemas/cart.schema';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async getCart(userId: string): Promise<CartItem[]> {
    const cart = await this.cartModel
      .findOne({ user_id: new Types.ObjectId(userId) })
      .populate('carts.books.book_id', 'title author price image')
      .exec();

    return cart ? cart.carts : [];
  }

  async addToCart(userId: string, bookData: AddToCartDto): Promise<void> {
    let cart = await this.cartModel.findOne({
      user_id: new Types.ObjectId(userId),
    });

    if (!cart) {
      cart = new this.cartModel({
        user_id: new Types.ObjectId(userId),
        carts: [],
      });
    }

    const existingPublisherIndex = cart.carts.findIndex(
      (item) => item.publisher === bookData.publisher,
    );

    if (existingPublisherIndex > -1) {
      const existingBookIndex = cart.carts[
        existingPublisherIndex
      ].books.findIndex((book) => book.book_id.toString() === bookData.book_id);

      if (existingBookIndex > -1) {
        cart.carts[existingPublisherIndex].books[existingBookIndex].quantity +=
          bookData.quantity;
      } else {
        cart.carts[existingPublisherIndex].books.push({
          book_id: new Types.ObjectId(bookData.book_id),
          quantity: bookData.quantity,
          addedAt: new Date(),
        });
      }
    } else {
      cart.carts.push({
        publisher: bookData.publisher,
        books: [
          {
            book_id: new Types.ObjectId(bookData.book_id),
            quantity: bookData.quantity,
            addedAt: new Date(),
          },
        ],
      });
    }

    await cart.save();
  }

  async updateQuantity(
    userId: string,
    updateQuantityDto: UpdateQuantityDto,
  ): Promise<void> {
    const { publisher, bookId, quantity } = updateQuantityDto;

    console.log('Input: ' + publisher, bookId, quantity);

    const cart = await this.cartModel.findOne({
      user_id: new Types.ObjectId(userId),
    });
    console.log(cart);

    if (!cart) {
      throw new NotFoundException(`Cart for user ${userId} not found`);
    }

    const existingPublisherIndex = cart.carts.findIndex(
      (item) => item.publisher === publisher,
    );

    if (existingPublisherIndex === -1) {
      throw new NotFoundException(`Publisher ${publisher} not found in cart`);
    }

    const bookIndex = cart.carts[existingPublisherIndex].books.findIndex(
      (book) => book.book_id.toString() === bookId,
    );

    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${bookId} not found in cart`);
    }

    cart.carts[existingPublisherIndex].books[bookIndex].quantity = quantity;
    await cart.save();
  }

  async deleteCartItem(
    userId: string,
    publisherIndex: number,
    bookId: string,
  ): Promise<boolean> {
    const cart = await this.cartModel.findOne({
      user_id: new Types.ObjectId(userId),
    });
    console.log('Cart of userid: ' + cart);

    if (!cart) return false;

    if (publisherIndex >= cart.carts.length) return false;

    const publisherCart = cart.carts[publisherIndex];
    const bookIndex = publisherCart.books.findIndex(
      (book) => book.book_id.toString() === bookId,
    );
    if (bookIndex === -1) return false;
    console.log('Book index: ' + bookIndex);

    publisherCart.books.splice(bookIndex, 1);

    if (publisherCart.books.length === 0) {
      cart.carts.splice(publisherIndex, 1);
    }

    console.log('Cart after modifying: ' + cart);

    await cart.save();
    return true;
  }
}
