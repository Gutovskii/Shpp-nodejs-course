import { Injectable } from "@nestjs/common";
import { User } from "src/api/users/user.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import * as bcrypt from 'bcryptjs';
import { Roles } from "src/api/roles/roles.enum";
import { Role } from "src/api/roles/role.entity";

@Injectable()
export default class UsersSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([
                {id: 1, username: 'string', hashPassword: bcrypt.hashSync('string')},
                {id: 2, username: 'admin', hashPassword: bcrypt.hashSync('admin')},
                {id: 3, username: 'user', hashPassword: bcrypt.hashSync('user')}
            ])
            .execute();

        await connection
            .createQueryBuilder()
            .insert()
            .into(Role)
            .values([
                {id: 1, name: Roles.USER},
                {id: 2, name: Roles.ADMIN}
            ])
            .execute();
        
        await connection
            .createQueryBuilder()
            .relation(User, "roles")
            .of([1,2])
            .add([2])

        await connection
            .createQueryBuilder()
            .relation(User, "roles")
            .of(3)
            .add(1);
    }
}