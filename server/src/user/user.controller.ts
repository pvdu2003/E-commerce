import { Body, Controller, Param, Patch } from '@nestjs/common';
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
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
