import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RolesModule } from '../roles/roles.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalLoginStrategy } from './strategies/local-login.strategy';
import { LocalRegisterStrategy } from './strategies/local-register.strategy';

@Module({
    controllers: [AuthController],
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const jwtModuleOptions: JwtModuleOptions = {
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.get('JWT_EXPIRES_IN')
                    }
                }
                return jwtModuleOptions;
            },
        }),
        PassportModule, 
        UsersModule,
        RolesModule,
        ConfigModule
    ],
    providers: [
        AuthService, 
        LocalLoginStrategy, 
        LocalRegisterStrategy, 
        JwtStrategy
    ]
})
export class AuthModule {}
