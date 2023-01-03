import { AuthGuard } from "@nestjs/passport";
import { CommonEnum } from "src/common/common.enum";

export class LocalLoginAuthGuard extends AuthGuard(CommonEnum.STRATEGY_LOCAL_LOGIN) {}