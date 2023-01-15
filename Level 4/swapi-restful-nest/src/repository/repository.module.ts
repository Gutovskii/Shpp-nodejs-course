import { Global, Module } from '@nestjs/common';
import { RepositoryWrapper } from './repository.wrapper';

@Global()
@Module({
    providers: [RepositoryWrapper],
    exports: [RepositoryWrapper]
})
export class RepositoryModule {}
