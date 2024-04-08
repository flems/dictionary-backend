import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CollocationDto } from './collocation.dto'

@Injectable()
export class CollocationService {
  constructor(private prisma: PrismaService) {}

  getById (id: string) {
    return this.prisma.collocation.findUnique({
      where: {
        id
      }
    })
  }

  getAll (userId: string) {
    return this.prisma.collocation.findMany({
      where: {
        userId
      }
    })
  }

  async create (dto: CollocationDto, userId: string) {
    
    if (!dto.name) throw new BadRequestException('Name is required')
    if (!dto.defenition) throw new BadRequestException('Defenition is required')

    return this.prisma.collocation.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId
          }
        }
      }
    })
  }

  async update (dto: Partial<CollocationDto>, collocationId: string, userId: string) {

    const collocation = await this.getById(collocationId)
    if (!collocation) throw new BadRequestException('Collocation does not exist')

    return this.prisma.collocation.update({
      where: {
        userId,
        id: collocationId
      },
      data: dto
    })
  }

  async delete (collocationId: string) {

    const collocation = await this.getById(collocationId)
    if (!collocation) throw new BadRequestException('Collocation does not exist')

    return this.prisma.collocation.delete({
      where: {
        id: collocationId
      }
    })
  }
}
