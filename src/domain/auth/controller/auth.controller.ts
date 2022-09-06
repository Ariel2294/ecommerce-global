import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../../../domain/user/dto/user.dto';
import { UserService } from '../../../domain/user/service/user.service';
import { AuthLoginDto } from '../dto/auth.dto';
import { AuthService } from '../service/auth.service';

@ApiTags('Auth')
@ApiBearerAuth('StaticToken')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
  ) {}

  @Post('login')
  login(@Body() credentials: AuthLoginDto, @Headers() headers) {
    const ip = headers['ip-address'];
    return this._authService.login(credentials, ip);
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
