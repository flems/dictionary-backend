import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module';
import { CollocationModule } from './collocation/collocation.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    CollocationModule
  ],
})
export class AppModule {}
