import { Global, Module } from '@nestjs/common';
import { DbProvider } from './repository.provider';
import { RepositoryWrapper } from './repository.wrapper';

@Global()
@Module({
    providers: [RepositoryWrapper, DbProvider],
    exports: [RepositoryWrapper]
})
export class RepositoryModule {}
