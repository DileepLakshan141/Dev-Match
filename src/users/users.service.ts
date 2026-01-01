import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user-dto';
import bcrypt from 'node_modules/bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(userDTO: CreateUserDTO): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const user = new User();
    user.email = userDTO.email;
    user.firstName = userDTO.firstName;
    user.lastName = userDTO.lastName;
    user.password = await bcrypt.hash(userDTO.password, salt);
    const new_user = await this.usersRepository.save(user);
    return new_user;
  }
}
