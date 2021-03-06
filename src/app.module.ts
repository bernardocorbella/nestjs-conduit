import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import * as ormconfig from './ormconfig';

export function DatabaseOrmModule(): DynamicModule {
  return TypeOrmModule.forRoot(ormconfig);
}

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), UserModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
