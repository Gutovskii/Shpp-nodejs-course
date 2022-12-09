import { AuthGuard } from "@nestjs/passport";
import { CommonEnum } from "src/common/common.enum";

export class LocalRegisterAuthGuard extends AuthGuard(CommonEnum.STRATEGY_LOCAL_REGISTER) {}