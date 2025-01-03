import { Model } from 'mongoose';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';

import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from '../auth/dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ChangePwdDto } from './dtos/change-pwd.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(userId: string): Promise<User | null> {
    return await this.userModel.findById(userId).select('-password').exec();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findById(id).select('-password').exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    Object.assign(user, updateUserDto);
    return user.save();
  }

  async changePassword(changePwdDto: ChangePwdDto): Promise<void> {
    const user = await this.userModel.findById(changePwdDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(
      changePwdDto.currentPassword,
      user.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    user.password = await bcrypt.hash(changePwdDto.newPassword, 10);
    await user.save();
  }

  async forgotPwd(username: string, email: string): Promise<string> {
    const user = await this.userModel.findOne({ username, email });
    if (!user) {
      throw new NotFoundException('User not found! Use another email, please!');
    }

    const newPwd = this.generatePwd();
    const hashedPwd = await bcrypt.hash(newPwd, 10);
    user.password = hashedPwd;
    await Promise.all([user.save(), this.sendEmail(email, newPwd)]);

    return 'New password sent to your email. Check your mail now!';
  }

  private async sendEmail(email: string, newPassword: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Your New Password',
      html: `<p>Your new password is: <strong>${newPassword}</strong></p>
             <p>Please reset your password after logging in.</p>`,
    });
  }
  private generatePwd(length = 12): string {
    const characters =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let password = '';

    // Generate random characters using crypto
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      password += characters[randomIndex];
    }

    return password;
  }
}
