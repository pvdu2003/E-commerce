import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '../schemas/category.schema';

@Controller('cat')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('all')
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async getById(
    @Param('id') id: string,
    @Query('page') page?: string,
    @Query('title') title?: string,
  ) {
    const currentPage = parseInt(page) || 1;
    const { category, books, totalPages } =
      await this.categoryService.getCategoryWithBooks(id, currentPage, title);

    return {
      category,
      books,
      currentPage,
      totalPages,
    };
  }
}
