import { Body, Controller, Get, HttpException, HttpStatus, Post, Put, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from '../shared/validation.pipe';
import { UserRO } from './user.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiImplicitBody, ApiImplicitParam, ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  async findMe(@User('email') email: string): Promise<UserRO> {
    return await this.userService.findByEmail(email);
  }

  @UsePipes(new ValidationPipe())
  @Post('users')
  async create(@Body('user') createUserData: CreateUserDto) {
    return this.userService.create(createUserData);
  }

  @Put('user')
  @ApiImplicitParam({ name: 'id', type: 'string' })
  @ApiImplicitBody({ name: 'user', type: UpdateUserDto })
  async update(@User('id') userId: string, @Body('user') userData: UpdateUserDto) {
    return await this.userService.update(userId, userData);
  }

  @UsePipes(new ValidationPipe())
  @Post('users/login')
  @ApiImplicitBody({ name: 'loginUser', type: LoginUserDto })
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserRO> {
    const userEntity = await this.userService.findOne(loginUserDto);

    if (!userEntity) {
      throw new HttpException({ message: 'Not found' }, HttpStatus.FORBIDDEN);
    }

    const token = await this.userService.generateJWT(userEntity);
    const { email, username, bio, image } = userEntity;
    const user = { email, token, username, bio, image };
    return { user };
  }
}
