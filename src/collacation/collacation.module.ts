import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'
import { UserService } from './collacation.service';
import { UserController } from './collacation.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService]
})
export class UserModule {}
