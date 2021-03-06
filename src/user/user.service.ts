import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRO } from './user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { getRepository, Repository } from 'typeorm';
import { validate } from 'class-validator';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { SECRET } from '../config';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const findOneOptions = {
      email: loginUserDto.email,
      password: crypto.createHmac('sha256', loginUserDto.password).digest('hex'),
    };

    return await this.userRepository.findOne(findOneOptions);
  }

  async create(dto: CreateUserDto): Promise<UserRO> {
    // check uniqueness
    const { username, email, password } = dto;
    const qb = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .orWhere('user.email = :email', { email });

    const user = await qb.getOne();

    if (user) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
          errors: {
            username: 'Username and email must be unique',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // create new user
    const newUser = new UserEntity();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      const shadowError = { username: 'Input is not valid' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors: shadowError },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const savedUser = await this.userRepository.save(newUser);
      return this.buildUserRO(savedUser);
    }
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    const toUpdate = await this.userRepository.findOne({ id });
    delete toUpdate.password;

    const updated = Object.assign(toUpdate, dto);
    return await this.userRepository.save(updated);
  }

  async findByEmail(email: string): Promise<UserRO> {
    const user = await this.userRepository.findOne({ email });
    return this.buildUserRO(user);
  }

  public generateJWT(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        exp: exp.getTime() / 1000,
      },
      SECRET,
    );
  }

  private buildUserRO(user: UserEntity) {
    const userRO = {
      username: user.username,
      email: user.email,
      bio: user.bio,
      token: this.generateJWT(user),
      image: user.image,
    };

    return { user: userRO };
  }
}
