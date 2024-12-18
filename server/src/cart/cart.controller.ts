import { Controller, Get, Post, Delete, Body, Param, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { Request } from 'express';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':userId')
    async getCart(@Param('userId') userId: string) {
        return this.cartService.getCart(userId);
    }

    @Post(':userId')
    async addToCart(@Param('userId') userId: string, @Body() createCartItemDto: AddToCartDto) {
        return this.cartService.addToCart(userId, createCartItemDto);
    }

  @Delete('delete/:id')
  async deleteHandler(@Req() req: Request, @Param('id') id: string) {
    const user = req.cookies.user;
    await this.cartService.deleteFromCart(user._id, id);
    return { message: 'Item removed from cart' }; 
  }
}