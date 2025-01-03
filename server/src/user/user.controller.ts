import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ChangePwdDto } from './dtos/change-pwd.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Patch('change-password')
  async changePassword(
    @Body()
    changePwdDto: ChangePwdDto,
  ) {
    await this.userService.changePassword(changePwdDto);
    return { message: 'Password changed successfully' };
  }
  @Post('forgot-password')
  async forgotPwd(
    @Body('email') email: string,
    @Body('username') username: string,
  ) {
    const message = await this.userService.forgotPwd(username, email);
    return { message };
  }
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
