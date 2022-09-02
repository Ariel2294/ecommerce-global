import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post()
  create(@Body() user: UserDto) {
    return this._userService.create(user);
  }

  @Get()
  getAll() {
    return this._userService.getAll();
  }
}
