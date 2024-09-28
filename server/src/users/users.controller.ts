import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  login(@Request() req) {
    return { user: req.user, message: 'Logged in' };
  }

  @Post('/reset-link')
  @HttpCode(HttpStatus.OK)
  @Header('Content-type', 'application/json')
  resetLink(@Body() { email }: { email: string }) {
    return this.usersService.resetLink(email);
  }

  @Post('/reset-password')
  @HttpCode(HttpStatus.OK)
  @Header('Content-type', 'application/json')
  resetPassword(
    @Body() { password, token }: { password: string; token: string },
  ) {
    return this.usersService.resetPassword(password, token);
  }

  @Get('/login-check')
  @UseGuards(AuthenticatedGuard)
  loginCheck(@Request() req) {
    return req.user;
  }

  @Get('/logout')
  logout(@Request() req) {
    req.session.destroy();
    return { message: 'session has ended' };
  }
}
