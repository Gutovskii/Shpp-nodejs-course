import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from "passport-local";
import { CommonEnum } from "src/common/common.enum";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalLoginStrategy extends PassportStrategy(Strategy, CommonEnum.STRATEGY_LOCAL_LOGIN) {
    constructor(
        private _authService: AuthService,
    ) {
        super();
    }

    async validate(username: string, password: string) {
        const token = await this._authService.login(username, password);
        return { token };
    }
}