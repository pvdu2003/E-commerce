import { Controller, Get, Param } from '@nestjs/common';
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
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findOne(id);
  }
}
