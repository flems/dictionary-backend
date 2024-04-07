import { Injectable } from '@nestjs/common'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { PrismaService } from 'src/prisma.service'
import { hash } from 'argon2'
import { UserDto } from './user.dto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getById (id: string) {
    return this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        collocations: true
      }
    })
  }

  async getProfile (id: string) {
    const profile = await this.getById(id)

    const totalColacations = profile.collocations.length

    // eslint-disable-next-line
    const { password, ...user } = profile

    return {
      user: user,
      statistics: [
        { label: 'totalColacations', value: totalColacations }
      ]
    }
  }

  getByEmail (email: string) {
    return this.prisma.user.findUnique({
      where: {
        email
      },
      include: {
        collocations: true
      }
    })
  }

  async create (dto: AuthDto) {
    const user = {
      email: dto.email,
      name: '',
      password: await hash(dto.password),
    }

    return this.prisma.user.create({
      data: user
    })
  }

  async update (id: string, dto: UserDto) {
    let data = dto

    if (data.password) [
      data = { ...dto, password: await hash(dto.password) }
    ]

    return this.prisma.user.update({
      where: {
        id
      },
      data
    })
  }
}
