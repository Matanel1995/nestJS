import { Body, Controller, UseGuards, Post, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
     login(@Body() input: { email: string; password: string }) {
        return this.authService.authenticate(input);
    }

    @Public()
    @Post('register')
    register(@Body() input: { email: string; password: string }) {
        return this.authService.createUser(input);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user; 
    }

}