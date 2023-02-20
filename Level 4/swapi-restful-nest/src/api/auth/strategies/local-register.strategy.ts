import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

export const STRATEGY_LOCAL_REGISTER = 'local-register';

@Injectable()
export class LocalRegisterStrategy extends PassportStrategy(
  Strategy,
  STRATEGY_LOCAL_REGISTER,
) {
  constructor(private _authService: AuthService) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<{ token: string }> {
    const token = await this._authService.register(username, password);
    return { token };
  }
}
