import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { config } from 'src/common/config';
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
                    secret: configService.get<typeof config.jwt.secret>('jwt.secret'),
                    signOptions: {
                        expiresIn: configService.get<typeof config.jwt.expiresIn>('jwt.expiresIn')
                    }
                }
                return jwtModuleOptions;
            },
        }),
        PassportModule, 
        UsersModule,
        RolesModule
    ],
    providers: [
        AuthService, 
        LocalLoginStrategy, 
        LocalRegisterStrategy, 
        JwtStrategy
    ]
})
export class AuthModule {}
