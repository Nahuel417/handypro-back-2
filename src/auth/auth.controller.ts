import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupUserDto } from '../user/dtos/signupUser.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signUp(@Body() newUser: SignupUserDto) {
        const userRegistered = await this.authService.signUp(newUser);

        return {
            mensaje: 'Usuario registrado exitosamente',
            usuario: userRegistered,
        };
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('local')) //The AuthGuard comes from the @nestjs/passport package
    @Post('login')
    async login(@Request() req) {
        return req.user;
    }
}
