import { Test, TestingModule } from '@nestjs/testing';
import { Film } from 'src/api/swapi/films/film.entity';
import { Person } from 'src/api/swapi/people/person.entity';
import { Planet } from 'src/api/swapi/planets/planet.entity';
import { RepositoryWrapper } from 'src/repository/repository.wrapper';
import { RelationsService } from './relations.service';

const mockRepo = {
  findOne: jest.fn()
    // addRelations
    .mockImplementationOnce(({where: {id}}) => Promise.resolve(getFakeFilmWithId(id)))
    .mockImplementationOnce(({where: {id}}) => Promise.resolve(getFakeFilmWithId(id)))
    .mockImplementationOnce(({where: {id}}) => Promise.resolve(getFakeFilmWithId(id)))
    .mockImplementationOnce(({where: {id}}) => Promise.resolve(getFakePlanetWithId(id)))
    // removeRelations
    .mockImplementationOnce(({where: {id}}) => Promise.resolve(getFakeFilmWithId(id)))
    .mockImplementationOnce(({where: {id}}) => Promise.resolve(getFakeFilmWithId(id)))
    .mockImplementationOnce(({where: {id}}) => Promise.resolve(getFakeFilmWithId(id)))
    .mockImplementationOnce(({where: {id}}) => Promise.resolve(getFakePlanetWithId(id)))
}

describe('RelationsService', () => {
  let service: RelationsService;

  const mockRepoWrapper = {
    films: mockRepo,
    planets: mockRepo
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RelationsService,
        {
          provide: RepositoryWrapper,
          useValue: mockRepoWrapper
        }
      ],
    }).compile();

    service = module.get<RelationsService>(RelationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add relations to an entity', async () => {
    const relations = {
      films: [15, 30, 45],
      homeworld: 42
    }

    expect(await service.addRelations(getFakePerson(), relations)).toEqual({
      ...getFakePerson(),
      films: [
        getFakeFilmWithId(relations.films[0]), 
        getFakeFilmWithId(relations.films[1]), 
        getFakeFilmWithId(relations.films[2])
      ],
      homeworld: getFakePlanetWithId(relations.homeworld)
    });
  });

  it('should remove relations from an entity', async () => {
    const relations = {
      films: [15, 30, 45],
      homeworld: 42
    }

    const testEntity: Person = {
      ...getFakePerson(),
      films: [
        getFakeFilmWithId(relations.films[0]), 
        getFakeFilmWithId(relations.films[1]), 
        getFakeFilmWithId(relations.films[2])
      ],
      homeworld: getFakePlanetWithId(relations.homeworld)
    }

    expect(await service.removeRelations(testEntity, relations)).toEqual(getFakePerson());
  });
});

const getFakePerson = (): Person => {
  return {
    id: 1,
    name: 'Luke',
    birthYear: '1337',
    gender: 'man',
    height: '181',
    mass: '62',
    eyeColor: 'brown',
    hairColor: 'brown',
    skinColor: 'white',
    films: [],
    homeworld: null,
    starships: [],
    vehicles: [],
    species: [],
    publicImages: [],
    fileImages: [],
    created: new Date('1337'),
    edited: new Date('1337')
  }
}

const getFakeFilmWithId = (id: number): Film => {
  return {
    id,
    title: 'A New Hope',
    episodeId: 4,
    openingCrawl: 'Very Big Opening Crawl',
    director: 'George Lucas',
    producer: 'Gary, Kurtz, Rick McCallum',
    releaseDate: '1977-05-25',
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    publicImages: [],
    fileImages: [],
    created: new Date('1337'),
    edited: new Date('1337')
  }
}

const getFakePlanetWithId = (id: number): Planet => {
  return {
    id,
    name: 'Tatooine',
    diameter: '10465',
    rotationPeriod: '23',
    orbitalPeriod: '304',
    gravity: '1 standard',
    population: '200000',
    climate: 'arid',
    terrain: 'desert',
    surfaceWater: '1',
    residents: [],
    species: [],
    films: [],
    publicImages: [],
    fileImages: [],
    created: new Date('1337'),
    edited: new Date('1337')
  }
}