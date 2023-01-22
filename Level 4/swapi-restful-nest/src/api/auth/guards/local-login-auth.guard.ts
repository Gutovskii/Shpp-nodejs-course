import { AuthGuard } from "@nestjs/passport";
import { STRATEGY_LOCAL_LOGIN } from "../strategies/local-login.strategy";

export class LocalLoginAuthGuard extends AuthGuard(STRATEGY_LOCAL_LOGIN) {}