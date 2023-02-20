import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { PassportResult } from './decorators/passport-result.decorator';
import { AuthDto } from './dto/auth.dto';
import { TokenDto } from './dto/token.dto';
import { LocalLoginAuthGuard } from './guards/local-login-auth.guard';
import { LocalRegisterAuthGuard } from './guards/local-register-auth.guard';

@Controller('auth')
@ApiTags('auth')
@ApiExtraModels(TokenDto)
export class AuthController {
  @Post('login')
  @ApiResponseData(TokenDto)
  @ApiBody({ type: AuthDto })
  @UseGuards(LocalLoginAuthGuard)
  async login(@PassportResult() tokenDto: TokenDto) {
    return tokenDto;
  }

  @Post('register')
  @ApiResponseData(TokenDto)
  @ApiBody({ type: AuthDto })
  @UseGuards(LocalRegisterAuthGuard)
  async register(@PassportResult() tokenDto: TokenDto) {
    return tokenDto;
  }
}
