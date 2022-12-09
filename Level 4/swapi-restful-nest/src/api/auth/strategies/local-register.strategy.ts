import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { CommonEnum } from "src/common/common.enum";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalRegisterStrategy extends PassportStrategy(Strategy, CommonEnum.STRATEGY_LOCAL_REGISTER) {
    constructor (
        private _authService: AuthService
    ) {
        super();
    }

    async validate(username: string, password: string) {
        const token = await this._authService.register(username, password);
        return { token };
    }
}