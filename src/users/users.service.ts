import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
// import * as bcrypt from 'bcrypt'; // KHÔNG CẦN DÙNG bcrypt nữa

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(name: string, email: string, password: string): Promise<User> {
    // Không băm mật khẩu nữa, lưu trực tiếp
    const createdUser = new this.userModel({ name, email, password });
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });

    if (!user) return null; // Không tìm thấy người dùng với email này

    // So sánh mật khẩu dạng văn bản thuần
    // (LƯU Ý: RẤT KHÔNG AN TOÀN)
    if (user.password !== password) {
      return null; // Mật khẩu không khớp
    }

    return user; // Đăng nhập thành công
  }
}