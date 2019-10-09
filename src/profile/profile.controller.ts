import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { ProfileRO } from './profile.interface';
import { ProfileService } from './profile.service';
import { User } from '../user/user.decorator';

@ApiBearerAuth()
@Controller('profiles')
@ApiUseTags('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':username')
  async findProfile(@User('id') userId, @Param('username') username: string): Promise<ProfileRO> {
    return await this.profileService.findOne(userId, username);
  }

  @Post(':username/follow')
  async follow(@User('id') userId: string, @Param('username') username: string): Promise<ProfileRO> {
    return await this.profileService.follow(userId, username);
  }

  @Delete(':username/follow')
  async unFollow(@User('id') id: string, @Param('username') username: string): Promise<ProfileRO> {
    return await this.profileService.unFollow(id, username);
  }
}
