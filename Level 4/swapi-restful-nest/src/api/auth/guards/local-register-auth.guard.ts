import { AuthGuard } from '@nestjs/passport';
import { STRATEGY_LOCAL_REGISTER } from '../strategies/local-register.strategy';

export class LocalRegisterAuthGuard extends AuthGuard(
  STRATEGY_LOCAL_REGISTER,
) {}
