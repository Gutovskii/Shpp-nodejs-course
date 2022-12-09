import { BaseRepository } from "src/repository/repository.realization";
import { DataSource } from "typeorm";
import { User } from "./user.entity";

export class UsersRepository extends BaseRepository<User> {
    constructor(ds: DataSource) {
        super(ds, User);
    }
}