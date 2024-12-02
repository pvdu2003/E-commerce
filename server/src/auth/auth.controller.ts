import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login.dto';
import { User } from '../schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }

  @Post('signin')
  async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.authService.login(loginUserDto);
    if (user) {
      return { message: 'Login successful', user };
    } else {
      return { message: 'Invalid credentials', statusCode: 401 };
    }
  }
}
