import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from '../shared/validation.pipe';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post('users')
  async create(@Body('user') createUserData: CreateUserDto) {
    return this.userService.create(createUserData);
  }
}
