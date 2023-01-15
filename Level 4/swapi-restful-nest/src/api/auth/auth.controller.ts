import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { PassportResult } from './decorators/passport-result.decorator';
import { AuthDto } from './dto/auth.dto';
import { LocalLoginAuthGuard } from './guards/local-login-auth.guard';
import { LocalRegisterAuthGuard } from './guards/local-register-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    @UseGuards(LocalLoginAuthGuard)
    @ApiBody({type: AuthDto})
    @Post('login')
    async login(@PassportResult() userJwtToken: {token: string}) {
        return userJwtToken;
    }

    @UseGuards(LocalRegisterAuthGuard)
    @ApiBody({type: AuthDto})
    @Post('register')
    async register(@PassportResult() userJwtToken: {token: string}) {
        return userJwtToken;
    }
}
