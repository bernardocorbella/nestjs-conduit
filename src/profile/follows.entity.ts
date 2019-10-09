import { Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('follows')
export class FollowsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn()
  followerId: string;

  @PrimaryColumn()
  followingId: string;
}
