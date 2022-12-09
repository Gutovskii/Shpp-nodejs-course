import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityInterface } from 'src/common/interfaces/entity.interface';
import { RepositoryWrapper } from 'src/repository/repository.wrapper';

@Injectable()
export class RelationsService {
    constructor(
        private _repoWrapper: RepositoryWrapper
    ) {}

    async addRelations<T extends EntityInterface>(entity: T, relations: Partial<Record<string, number[] | number>>): Promise<T> {
        for (const connectedEntityName in {...relations}) {
            if (entity.hasOwnProperty(connectedEntityName)) {
                const generalEntityName = this.entityNameTransformer(connectedEntityName);
                const entitiesToConnectPromises: Promise<EntityInterface>[] = [];
                if (typeof relations[connectedEntityName] === 'object') {
                    (relations[connectedEntityName] as number[]).map(async id => {
                        const entityToConnect = this._repoWrapper[generalEntityName as keyof RepositoryWrapper].findOne({where: {id}});
                        if (!entityToConnect) throw new NotFoundException();
                        entitiesToConnectPromises.push(entityToConnect);
                    });
                    const entitiesToConnect = (await Promise.all(entitiesToConnectPromises))
                        .filter(etc => etc && (entity[connectedEntityName] as EntityInterface[]).every(e => e.id !== etc.id));
                    (entity[connectedEntityName] as EntityInterface[]).push(...entitiesToConnect);
                }
                else if (typeof relations[connectedEntityName] === 'number') {
                    const id = relations[connectedEntityName] as number;
                    const entityToConnect = await this._repoWrapper[generalEntityName as keyof RepositoryWrapper].findOne({where: {id}});
                    if (!entityToConnect) throw new NotFoundException();
                    entity[connectedEntityName] = entityToConnect;
                }
            }
        }
        return entity;
    }

    async removeRelations<T extends EntityInterface>(entity: T, relations: Partial<Record<string, number[] | number>>): Promise<T> {
        for (const connectedEntityName in {...relations}) {
            if (entity.hasOwnProperty(connectedEntityName)) {
                const generalEntityName = this.entityNameTransformer(connectedEntityName);
                if (typeof relations[connectedEntityName] === 'object') {
                    const entitiesToDisconnectPromises: Promise<EntityInterface>[] = [];
                    (relations[connectedEntityName] as number[]).map(id => {
                        const entityToDisconnect = this._repoWrapper[generalEntityName as keyof RepositoryWrapper].findOne({where: {id}});
                        if (!entityToDisconnect) throw new NotFoundException();
                        entitiesToDisconnectPromises.push(entityToDisconnect);
                    });
                    const entitiesToDisconnect = (await Promise.all(entitiesToDisconnectPromises)).filter(etd => etd);
                    entity[connectedEntityName] = (entity[connectedEntityName] as EntityInterface[])
                        .filter(e => entitiesToDisconnect.every(etd => etd.id !== e.id));
                }
                else if (typeof relations[connectedEntityName] === 'number') {
                    const id = relations[connectedEntityName] as number;
                    const entityToDisconnect = await this._repoWrapper[generalEntityName as keyof RepositoryWrapper].findOne({where: {id}});
                    if (!entityToDisconnect) throw new NotFoundException();
                    entity[connectedEntityName] = null;
                }
            }
        }
        return entity;
    }

    private entityNameTransformer(name: string): string {
        switch (name) {
            case 'pilots': case 'characters': case 'residents': return 'people';
            case 'homeworld': return 'planets';
            default: return name;
        }
    }
}
