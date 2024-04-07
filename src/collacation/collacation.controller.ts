import { Body, Controller, Get, HttpCode, UsePipes, Put, ValidationPipe } from '@nestjs/common';
import { UserService } from './collacation.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { UserDto } from './collacation.dto'

@Controller('user/profile')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get()
  @Auth()
  async profile(@CurrentUser('id') id: string) {
    return this.userService.getProfile(id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  @Auth()
  async updateProfile(@CurrentUser('id') id: string, @Body() dto: UserDto) {
    return this.userService.update(id, dto)
  }
}
