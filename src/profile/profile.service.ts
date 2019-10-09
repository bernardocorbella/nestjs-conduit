import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { ProfileData, ProfileRO } from './profile.interface';

@Injectable()
export class ProfileService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async findOne(userId: string, username: string): Promise<ProfileRO> {
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      return;
    }

    const profile: ProfileData = {
      username: user.username,
      bio: user.bio,
      image: user.image,
      following: false,
    };

    return { profile };
  }
}
