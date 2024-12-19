import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':userId')
  async getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Post(':userId')
  async addToCart(
    @Param('userId') userId: string,
    @Body() createCartItemDto: AddToCartDto,
  ) {
    return this.cartService.addToCart(userId, createCartItemDto);
  }
}
