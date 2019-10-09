import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { ProfileData, ProfileRO } from './profile.interface';
import { FollowsEntity } from './follows.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(FollowsEntity) private readonly followsRepository: Repository<FollowsEntity>,
  ) {}

  async findOne(userId: string, username: string): Promise<ProfileRO> {
    const profileEntity = await this.userRepository.findOne({ username });

    if (!profileEntity) {
      return;
    }

    const profile: ProfileData = {
      username: profileEntity.username,
      bio: profileEntity.bio,
      image: profileEntity.image,
    };

    const follows = await this.followsRepository.findOne({ followerId: userId, followingId: profileEntity.id });

    profile.following = !!follows;

    return { profile };
  }

  async follow(userId: string, username: string): Promise<ProfileRO> {
    const followingUser = await this.userRepository.findOne({ id: userId });

    if (followingUser.id === userId) {
      throw new HttpException(`Can't follow yourself`, HttpStatus.BAD_REQUEST);
    }

    const followsEntity = await this.followsRepository.findOne({ followerId: userId, followingId: followingUser.id });

    if (!followsEntity) {
      const follows = new FollowsEntity();
      follows.followerId = userId;
      follows.followingId = followingUser.id;
      await this.followsRepository.save(follows);
    }

    const profile: ProfileData = {
      username: followingUser.username,
      bio: followingUser.bio,
      image: followingUser.image,
      following: true,
    };

    return { profile };
  }
}
