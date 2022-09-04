import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from '../../../domain/user/dto/user.dto';
import { UserService } from '../../../domain/user/service/user.service';
import { AuthLoginDto } from '../dto/auth.dto';
import { AuthService } from '../service/auth.service';
import { Request } from 'express';

import * as requestIp from '@supercharge/request-ip';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
  ) {}

  @Post()
  login(@Body() credentials: AuthLoginDto, @Req() request: Request) {
    console.log(requestIp.getClientIp(request));
    return this._authService.login(credentials);
  }

  @Post('register')
  register(@Body() user: UserDto) {
    return this._userService.create(user);
  }

  @Get('verify-account/:token')
  verifyAccount(@Param('token') token: string) {
    return this._authService.verifyAccount(token);
  }
}
