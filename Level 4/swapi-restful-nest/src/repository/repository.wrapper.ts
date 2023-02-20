import { Injectable } from '@nestjs/common';
import { FilmsRepository } from 'src/api/swapi/films/films.repository';
import { PeopleRepository } from 'src/api/swapi/people/people.repository';
import { PlanetsRepository } from 'src/api/swapi/planets/planets.repository';
import { SpeciesRepository } from 'src/api/swapi/species/species.repository';
import { StarshipsRepository } from 'src/api/swapi/starships/starships.repository';
import { VehiclesRepository } from 'src/api/swapi/vehicles/vehicles.repository';
import { DataSource } from 'typeorm';
import { FileImagesRepository } from 'src/api/images/repositories/file-images.repository';
import { PublicImagesRepository } from 'src/api/images/repositories/public-images.repository';
import { UsersRepository } from 'src/api/users/users.repository';
import { RolesRepository } from 'src/api/roles/roles.repository';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class RepositoryWrapper {
  constructor(
    @InjectEntityManager()
    private _ds: DataSource,
  ) {}

  private _filmsRepository: FilmsRepository;
  private _peopleRepository: PeopleRepository;
  private _planetsRepository: PlanetsRepository;
  private _speciesRepository: SpeciesRepository;
  private _starshipsRepository: StarshipsRepository;
  private _vehiclesRepository: VehiclesRepository;
  private _fileImagesRepository: FileImagesRepository;
  private _publicImagesRepository: PublicImagesRepository;
  private _usersRepository: UsersRepository;
  private _rolesRepository: RolesRepository;

  get films(): FilmsRepository {
    if (!this._filmsRepository) return new FilmsRepository(this._ds);
    return this._filmsRepository;
  }

  get people(): PeopleRepository {
    if (!this._peopleRepository) return new PeopleRepository(this._ds);
    return this._peopleRepository;
  }

  get planets(): PlanetsRepository {
    if (!this._planetsRepository) return new PlanetsRepository(this._ds);
    return this._planetsRepository;
  }

  get species(): SpeciesRepository {
    if (!this._speciesRepository) return new SpeciesRepository(this._ds);
    return this._speciesRepository;
  }

  get starships(): StarshipsRepository {
    if (!this._starshipsRepository) return new StarshipsRepository(this._ds);
    return this._starshipsRepository;
  }

  get vehicles(): VehiclesRepository {
    if (!this._vehiclesRepository) return new VehiclesRepository(this._ds);
    return this._vehiclesRepository;
  }

  get fileImages(): FileImagesRepository {
    if (!this._fileImagesRepository) return new FileImagesRepository(this._ds);
    return this._fileImagesRepository;
  }

  get publicImages(): PublicImagesRepository {
    if (!this._publicImagesRepository)
      return new PublicImagesRepository(this._ds);
    return this._publicImagesRepository;
  }

  get users(): UsersRepository {
    if (!this._usersRepository) return new UsersRepository(this._ds);
    return this._usersRepository;
  }

  get roles(): RolesRepository {
    if (!this._rolesRepository) return new RolesRepository(this._ds);
    return this._rolesRepository;
  }
}
