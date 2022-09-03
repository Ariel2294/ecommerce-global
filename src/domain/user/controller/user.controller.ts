import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserDto, UserFilterDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post()
  create(@Body() user: UserDto) {
    return this._userService.create(user);
  }

  @ApiQuery({
    name: 'userId',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'search',
    type: String,
    required: false,
  })
  @Get()
  getAll(@Query() filter: UserFilterDto) {
    return this._userService.getAll(filter);
  }
}
