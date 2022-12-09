import { BaseRepository } from "src/repository/repository.realization";
import { DataSource } from "typeorm";
import { Person } from "./person.entity";

export class PeopleRepository extends BaseRepository<Person> {
    constructor(ds: DataSource) {
        super(ds, Person);
    }
} 