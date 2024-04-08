import { Body, Controller, Get, HttpCode, UsePipes, Put, Post, ValidationPipe, Param, Delete } from '@nestjs/common';
// import { UserService } from './collocation.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { Auth } from 'src/auth/decorators/auth.decorator'
// import { UserDto } from './collocation.dto'
// import { CollocationDto } from './collocation.dto'
import { CollocationService } from './collocation.service'
import { CollocationDto } from './collocation.dto'

@Controller('/collocation')
export class CollocationController {
  constructor(private readonly collocationService: CollocationService) {}


  @Get()
  @Auth()
  async getAll(@CurrentUser('id') userId: string) {
    return this.collocationService.getAll(userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: CollocationDto, @CurrentUser('id') userId: string) {
    return this.collocationService.create(dto, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(
    @Body() dto: CollocationDto,
    @CurrentUser('id') userId: string,
    @Param('id') id: string
  ) {
    return this.collocationService.update(dto, id, userId)
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    return this.collocationService.delete(id)
  }

}
