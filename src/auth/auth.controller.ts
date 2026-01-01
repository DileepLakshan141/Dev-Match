import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user-dto';
import { LoginUserDTO } from 'src/users/dto/login-user-dto';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.authService.register(createUserDTO);
  }

  @Post('signin')
  async signin(@Body() loginUserDTO: LoginUserDTO): Promise<User | null> {
    return await this.authService.login(loginUserDTO);
  }
}
