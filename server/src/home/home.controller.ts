import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  // [GET] /home
  @Get()
  async homePage() {
    return await this.homeService.getTopBooksPerCategory();
  }
}
