import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';

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

  @Patch('update/:userId')
  async updateQuantity(
    @Param('userId') userId: string,
    @Body() updateQuantityDto: UpdateQuantityDto,
  ) {
    return this.cartService.updateQuantity(userId, updateQuantityDto);
  }

  @Delete(':userId/:index/:bookId')
  async deleteBookFromCart(
    @Param('userId') userId: string,
    @Param('index') index: string,
    @Param('bookId') bookId: string,
  ): Promise<{ message: string }> {
    const publisherIndex = parseInt(index);

    const result = await this.cartService.deleteCartItem(
      userId,
      publisherIndex,
      bookId,
    );
    if (!result) {
      throw new NotFoundException('Book not found or cart not found');
    }

    return { message: 'Book removed from cart successfully' };
  }
}
