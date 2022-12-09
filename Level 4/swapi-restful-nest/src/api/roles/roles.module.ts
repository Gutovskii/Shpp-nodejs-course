import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RolesProfile } from './roles.profile';
import { UsersModule } from '../users/users.module';

@Module({
    controllers: [RolesController],
    providers: [RolesService, RolesProfile],
    exports: [RolesService],
    imports: [forwardRef(() => UsersModule)]
})
export class RolesModule {}
