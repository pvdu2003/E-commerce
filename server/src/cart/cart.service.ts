import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument, CartItem } from '../schemas/cart.schema';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
    constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>,        
) {}

    async getCart(userId: string): Promise<CartItem[]> {
        const cart = await this.cartModel
            .findOne({ user_id: new Types.ObjectId(userId) })
            .populate('carts.book_id', 'title author price image')
            .exec();
        if (!cart) return [];

        return cart.carts;
    }

    async addToCart(userId: string, bookData: AddToCartDto): Promise<void> {
        let cart = await this.cartModel.findOne({ user_id:  new Types.ObjectId(userId)  });
        if (!cart) {
            cart = new this.cartModel({ user_id: new Types.ObjectId(userId) , carts: [] });
        }

        const existingItemIndex = cart.carts.findIndex(item => item.book_id.toString() === bookData.book_id);
        if (existingItemIndex > -1) {
            cart.carts[existingItemIndex].quantity += bookData.quantity; 
        } else {
            cart.carts.push({
                _id: new Types.ObjectId(),
                book_id: new Types.ObjectId(bookData.book_id), 
                quantity: bookData.quantity,
            });        
        }

        await cart.save();
    }

    async deleteFromCart(userId: string, cartItemId: string): Promise<void> {
        const cart = await this.cartModel.findOne({ user_id: userId });
        if (cart) {
            cart.carts = cart.carts.filter(item => item._id.toString() !== cartItemId);
            await cart.save();
        }
    }
}