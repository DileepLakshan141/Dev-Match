import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-guard';

interface UserRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(
    @Req() request: UserRequest,
  ): { userId: string; email: string } | string {
    if (request?.user) {
      return request?.user;
    } else {
      return 'hey';
    }
  }
}
