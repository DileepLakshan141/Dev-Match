import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginUserDTO } from 'src/users/dto/login-user-dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'node_modules/bcryptjs';
import { CreateUserDTO } from 'src/users/dto/create-user-dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(loginDTO: LoginUserDTO): Promise<User | null> {
    const target_user = await this.usersService.findOne(loginDTO.email);

    if (!target_user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const password_match = await bcrypt.compare(
      loginDTO.password,
      target_user?.password,
    );
    if (password_match) {
      return target_user;
    } else {
      throw new HttpException(
        'Passwords does not match',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async register(userDTO: CreateUserDTO): Promise<User> {
    try {
      const salt_rounds = await bcrypt.genSalt(10);
      userDTO.password = await bcrypt.hash(userDTO.password, salt_rounds);
      return await this.usersService.create(userDTO);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Server side error while creating account',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
