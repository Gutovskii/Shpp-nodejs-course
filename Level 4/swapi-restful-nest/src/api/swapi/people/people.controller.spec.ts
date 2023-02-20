import { getMapperToken } from '@automapper/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { FileImage } from 'src/api/images/entities/file-image.entity';
import { PublicImage } from 'src/api/images/entities/public-image.entity';
import { PaginationResult } from 'src/common/classes/pagination.class';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { Person } from './person.entity';

describe('PeopleController', () => {
  let controller: PeopleController;

  const mockPeopleService = {
    findByPage: jest
      .fn()
      .mockImplementation((page, count) =>
        Promise.resolve(getFakePeopleByPage(page, count)),
      ),
    findOne: jest
      .fn()
      .mockImplementation((id) => Promise.resolve(getFakePersonWithId(id))),
    exists: jest.fn().mockImplementation((id) => Promise.resolve(true)),
    create: jest.fn().mockImplementation((person, images) => ({
      ...person,
      publicImages: getFakePublicImages(),
      fileImages: getFakeFileImages(),
    })),
    update: jest.fn().mockImplementation((id, dto) => ({
      id,
      ...dto,
    })),
    remove: jest.fn().mockImplementation((person) => Promise.resolve(person)),
    addImages: jest.fn().mockImplementation((person, images) => ({
      ...person,
      publicImages: getFakePersonWithId(person.id).publicImages.concat(
        getFakePublicImages(),
      ),
      fileImages: getFakePersonWithId(person.id).fileImages.concat(
        getFakeFileImages(),
      ),
    })),
    addRelations: jest.fn().mockImplementation((person, relations) => person),
    removeRelations: jest
      .fn()
      .mockImplementation((person, relations) => person),
  };

  const mockMapper = {
    mapAsync: jest.fn().mockImplementation((dto) => {
      const mappedPerson = {
        ...getFakePersonWithId(1),
        ...dto,
      };
      delete mappedPerson.images;
      return Promise.resolve(mappedPerson);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [
        {
          provide: PeopleService,
          useValue: mockPeopleService,
        },
        {
          provide: getMapperToken(),
          useValue: mockMapper,
        },
      ],
    }).compile();

    controller = module.get<PeopleController>(PeopleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get people by page', async () => {
    const page = 1;
    const count = 3;

    expect(await controller.getPeopleByPage(page, count)).toEqual(
      getFakePeopleByPage(page, count),
    );
    expect(mockMapper.mapAsync);
    expect(mockPeopleService.findByPage).toBeCalledTimes(1);
  });

  it('should get person by id', async () => {
    const id = 1;

    expect(await controller.getPersonById(id)).toEqual(getFakePersonWithId(id));
    expect(mockPeopleService.findOne).toBeCalledTimes(1);
  });

  it('should create a person', async () => {
    const newPersonId = 1;

    expect(
      await controller.createPerson(getFakeCreatePersonDto(), getFakeFiles()),
    ).toEqual({
      ...getFakePersonWithId(newPersonId),
      publicImages: getFakePublicImages(),
      fileImages: getFakeFileImages(),
    });
    expect(mockMapper.mapAsync).toBeCalledTimes(1);
    expect(mockPeopleService.create).toBeCalledTimes(1);
  });

  it('should update a person', async () => {
    const id = 1;

    expect(await controller.updatePerson(id, getFakeUpdatePersonDto())).toEqual(
      {
        ...getFakePersonWithId(id),
        ...getFakeUpdatePersonDto(),
      },
    );
    expect(mockMapper.mapAsync).toBeCalledTimes(2);
    expect(mockPeopleService.update).toBeCalledTimes(1);
  });

  it('should delete a person', async () => {
    const id = 1;

    expect(await controller.removePerson(id)).toEqual(getFakePersonWithId(id));
    expect(mockPeopleService.findOne).toBeCalledTimes(2);
    expect(mockPeopleService.remove).toBeCalledTimes(1);
  });

  it('should add images to a person', async () => {
    const id = 1;

    expect(await controller.addImages(id, getFakeFiles())).toEqual({
      ...getFakePersonWithId(id),
      publicImages: getFakePersonWithId(id).publicImages.concat(
        getFakePublicImages(),
      ),
      fileImages: getFakePersonWithId(id).fileImages.concat(
        getFakeFileImages(),
      ),
    });
    expect(mockPeopleService.addImages).toBeCalledTimes(1);
    expect(mockPeopleService.findOne).toBeCalledTimes(3);
  });

  it('should add relations to a person', async () => {
    const id = 1;
    const relations = {
      films: [1, 2, 3],
      homeworld: 1,
    };

    expect(await controller.addRelations(id, relations)).toEqual(
      getFakePersonWithId(id),
    );
    expect(mockPeopleService.findOne).toBeCalledTimes(4);
    expect(mockPeopleService.addRelations).toBeCalledTimes(1);
  });

  it('should remove relations from a person', async () => {
    const id = 1;
    const relations = {
      films: [1, 2, 3],
      homeworld: 1,
    };

    expect(await controller.removeRelations(id, relations)).toEqual(
      getFakePersonWithId(id),
    );
    expect(mockPeopleService.findOne).toBeCalledTimes(5);
    expect(mockPeopleService.removeRelations).toBeCalledTimes(1);
  });
});

const getFakePeopleByPage = (
  page: number,
  count: number,
): PaginationResult<
  Omit<
    Person,
    | 'homeworld'
    | 'films'
    | 'starships'
    | 'vehicles'
    | 'species'
    | 'publicImages'
    | 'fileImages'
  >
> => {
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
      edited: new Date('1337'),
    })),
    totalCount: count,
  };
};

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
    edited: new Date('1337'),
  };
};

const getFakeCreatePersonDto = (): CreatePersonDto => {
  return {
    name: 'Luke',
    birthYear: '1337',
    gender: 'man',
    height: '181',
    mass: '62',
    eyeColor: 'brown',
    hairColor: 'brown',
    skinColor: 'white',
    images: [],
  };
};

const getFakeUpdatePersonDto = (): UpdatePersonDto => {
  return {
    name: 'Luke',
    birthYear: '1337',
    gender: 'man',
    height: '181',
    mass: '62',
    eyeColor: 'brown',
    hairColor: 'brown',
    skinColor: 'white',
  };
};

const getFakePublicImages = (): PublicImage[] => {
  return [
    {
      id: 1,
      url: 'https://nest-restful-swapi.s3.eu-north-1.amazonaws.com/not-a-png.png',
      key: '1f45f82ae01eafd68c1337fe3bb1010w',
    },
    {
      id: 2,
      url: 'https://nest-restful-swapi.s3.eu-north-1.amazonaws.com/tochno-ne-png.png',
      key: '1f45f82ae01eafd68c5678fe3bb1337q',
    },
  ];
};

const getFakeFileImages = (): FileImage[] => {
  return [
    {
      id: 1,
      fileName: '10e2772b-4147-4ad9-ac2b-cc61d5707418.png',
    },
    {
      id: 2,
      fileName: 'af6e0f1a-5341-40b2-aee0-c3fa5aec136f.png',
    },
  ];
};

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
      buffer: null,
    },
  ];
};
