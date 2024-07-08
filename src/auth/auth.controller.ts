import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
  } from '@nestjs/common';
  import { AuthGuard } from './auth.guard';
  import { AuthService } from './auth.service';
  import { SignInRequest } from './signInDto';
import { ApiBearerAuth } from '@nestjs/swagger';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    
    @Post('login')
    signIn(@Body() signInDto: SignInRequest) {
      return this.authService.signIn(signInDto.username, signInDto.password);
    }
  
    @ApiBearerAuth('Bearer')
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
  }