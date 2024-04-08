import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'
import { CollocationService } from './collocation.service';
import { CollocationController } from './collocation.controller';

@Module({
  controllers: [CollocationController],
  providers: [CollocationService, PrismaService],
  exports: [CollocationService]
})
export class CollocationModule {}
