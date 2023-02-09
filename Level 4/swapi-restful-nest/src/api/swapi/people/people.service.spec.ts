import { Test, TestingModule } from '@nestjs/testing';
import { FileImage } from 'src/api/images/entities/file-image.entity';
import { PublicImage } from 'src/api/images/entities/public-image.entity';
import { ImagesService } from 'src/api/images/images.service';
import { PaginationResult } from 'src/common/classes/pagination.class';
import { RelationsService } from 'src/relations/relations.service';
import { RepositoryWrapper } from 'src/repository/repository.wrapper';
import { PeopleService } from './people.service';
import { Person } from './person.entity';

describe('PeopleService', () => {
  let service: PeopleService;

  const mockRelationsService = {
    addRelations: jest.fn().mockImplementation((entity, relations) => Promise.resolve(entity)),
    removeRelations: jest.fn().mockImplementation((entity, relations) => Promise.resolve(entity))
  }

  const mockImagesService = {
    createPublicImages: jest.fn().mockImplementation(images => Promise.resolve(getFakePublicImages())),
    deletePublicImages: jest.fn().mockImplementation(images => Promise.resolve()),
    createFileImages: jest.fn().mockImplementation(images => Promise.resolve(getFakeFileImages())),
    deleteFileImages: jest.fn().mockImplementation(images => Promise.resolve())
  }

  const mockRepoWrapper = {
    people: {
      findByPage: jest.fn().mockImplementation((page, count) => Promise.resolve(getFakePeopleByPage(page, count))),
      findOne: jest.fn().mockImplementation(({where: { id }}) => Promise.resolve(getFakePersonWithId(id))),
      create: jest.fn().mockImplementation(person => Promise.resolve(person)),
      update: jest.fn().mockImplementation((id, person) => Promise.resolve({...person, id})),
      remove: jest.fn().mockImplementation(person => Promise.resolve(person)),
      save: jest.fn().mockImplementation(person => Promise.resolve(person))
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeopleService,
        {
          provide: ImagesService,
          useValue: mockImagesService
        },
        {
          provide: RelationsService,
          useValue: mockRelationsService
        },
        {
          provide: RepositoryWrapper,
          useValue: mockRepoWrapper
        }
      ],
    })
    .compile();

    service = module.get<PeopleService>(PeopleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find people by page', async () => {
    const page = 1;
    const count = 3;

    expect(await service.findByPage(page, count)).toEqual(getFakePeopleByPage(page, count));
    expect(mockRepoWrapper.people.findByPage).toBeCalledTimes(1);
  });

  it('should find a person by id', async () => {
    const id = 1;

    expect(await service.findOne(id)).toEqual(getFakePersonWithId(id));
    expect(mockRepoWrapper.people.findOne).toBeCalledTimes(1);
  })

  it('should check if a person exists', async () => {
    const id = 1;

    expect(await service.exists(id)).toEqual(true);
    expect(mockRepoWrapper.people.findOne).toBeCalledTimes(2);
  });

  it('should create a person', async () => {
    const person = new Person();

    expect(await service.create(person, getFakeFiles())).toEqual(person);
    expect(mockImagesService.createPublicImages).toBeCalledTimes(1);
    expect(mockImagesService.createFileImages).toBeCalledTimes(1);
    expect(mockRepoWrapper.people.create).toBeCalledTimes(1);
  });

  it('should update a person', async () => {
    const id = 1;
    const person = new Person();

    expect(await service.update(id, person)).toEqual({...person, id});
    expect(mockRepoWrapper.people.update).toBeCalledTimes(1);
  })

  it('should remove a person', async () => {
    const person = new Person();

    expect(await service.remove(person)).toEqual(person);
    expect(mockRepoWrapper.people.remove).toBeCalledTimes(1);
  });

  it('should add images to person', async () => {
    const person = new Person();
    person.publicImages = [];
    person.fileImages = [];

    expect(await service.addImages(person, getFakeFiles())).toEqual(person);
    expect(mockImagesService.createPublicImages).toBeCalledTimes(2);
    expect(mockImagesService.createFileImages).toBeCalledTimes(2);
    expect(mockRepoWrapper.people.save).toBeCalledTimes(1);
  });

  it('should add relations to person', async () => {
    const person = new Person();
    const relations = {
      films: [1,2,3],
      homeworld: 1
    }

    expect(await service.addRelations(person, relations)).toEqual(person);
    expect(mockRepoWrapper.people.save).toBeCalledTimes(2);
  });

  it('should remove relations from person', async () => {
    const person = new Person();
    const relations = {
      films: [1,2,3],
      homeworld: 1
    }
    
    expect(await service.removeRelations(person, relations)).toEqual(person);
    expect(mockRepoWrapper.people.save).toBeCalledTimes(3);
  })
});

// ???
const getFakePeopleByPage = (page: number, count: number): 
  PaginationResult<Omit<Person, 'homeworld' | 'films' | 'starships' | 'vehicles' | 'species' | 'publicImages' | 'fileImages'>> => {
  return {
    partOfEntities: new Array(count).fill(null).map((person, idx) => ({
      id: idx + 1,
      name: 'Luke',
      birthYear: '1337',
      gender: 'man',
      height: '181',
      mass: '62',
      eyeColor: 'brown',
      hairColor: 'brown',
      skinColor: 'white',
      created: new Date('1337'),
      edited: new Date('1337')
    })),
    totalCount: count
  }
}

const getFakePersonWithId = (id: number): Person => {
  return {
    id,
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

const getFakePublicImages = (): PublicImage[] => {
  return [
    {
      id: 1,
      url: 'https://nest-restful-swapi.s3.eu-north-1.amazonaws.com/not-a-png.png',
      key: '1f45f82ae01eafd68c1337fe3bb1010w'
    }, 
    {
      id: 2,
      url: 'https://nest-restful-swapi.s3.eu-north-1.amazonaws.com/tochno-ne-png.png',
      key: '1f45f82ae01eafd68c5678fe3bb1337q'
    }
  ];
}

const getFakeFileImages = (): FileImage[] => {
  return [
    {
      id: 1,
      fileName: '10e2772b-4147-4ad9-ac2b-cc61d5707418.png'
    },
    {
      id: 2,
      fileName: 'af6e0f1a-5341-40b2-aee0-c3fa5aec136f.png'
    }
  ];
}

const getFakeFiles = (): Express.Multer.File[] => {
  return [
    {
      fieldname: 'fieldname',
      originalname: 'originalname',
      encoding: 'encoding',
      mimetype: 'png',
      size: 1337,
      stream: null,
      destination: 'destination',
      filename: 'filename',
      path: 'path',
      buffer: null
    }
  ];
}
