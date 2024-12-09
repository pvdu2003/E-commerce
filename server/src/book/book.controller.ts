import { Controller, Get, Param, Query } from '@nestjs/common';
import { BooksService } from './book.service';
import { Book } from '../schemas/book.schema';

@Controller('book')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('list')
  async getAll(@Query() query): Promise<{ books: Book[]; totalPages: number }> {
    return this.booksService.findAll(query);
  }
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Book> {
    return this.booksService.findById(id);
  }
}
