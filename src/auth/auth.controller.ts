import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RequestSignUp } from './interfaces';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { Request } from '@nestjs/common/decorators/http/route-params.decorator';
import { LocalAuthGuard } from './strategies/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @HttpCode(201)
    @Post('sign-up')
    async signUp(@Body() data: RequestSignUp) {
      await this.authService.signUp(data);
    }
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
      return await this.authService.login(req.user);
    }
}
