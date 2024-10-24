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
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';

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

    @HttpCode(HttpStatus.OK) //set status code 200
    @UseGuards(LocalAuthGuard) 
    @Post('login')
    async login(@Request() req) {
        //Upon a successful login with local strategy we need to generate a jwt token and return it back with the user id.

        const token = this.authService.login(
            req.user.id,
            req.user.role,
            req.user.email,
            req.user.fullname,
        );

        return { id: req.user.id, token };
    }
}
