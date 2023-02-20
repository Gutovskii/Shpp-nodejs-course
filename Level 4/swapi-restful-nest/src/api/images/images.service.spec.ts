import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { S3 } from 'aws-sdk';
import { RepositoryWrapper } from 'src/repository/repository.wrapper';
import { FileImage } from './entities/file-image.entity';
import { PublicImage } from './entities/public-image.entity';
import { ImagesService } from './images.service';

jest.mock('uuid', () => {
  const originalModule = jest.requireActual('uuid');

  return {
    __esModule: true,
    ...originalModule,
    v4: jest.fn().mockImplementation(() => 'fileName'),
  };
});

jest.mock('fs/promises', () => {
  const originalModule = jest.requireActual('fs/promises');

  return {
    __esModule: true,
    ...originalModule,
    writeFile: jest.fn().mockImplementation(() => Promise.resolve()),
    unlink: jest.fn().mockImplementation(() => Promise.resolve()),
  };
});

const mockRepo = {
  createMany: jest
    .fn()
    .mockImplementation((entities) => Promise.resolve(entities)),
  removeMany: jest
    .fn()
    .mockImplementation((entities) => Promise.resolve(entities)),
};

describe('ImagesService', () => {
  let service: ImagesService;

  const mockRepoWrapper = {
    publicImages: {
      ...mockRepo,
      find: jest.fn().mockImplementation((request) => getFakePublicImages()),
    },
    fileImages: {
      ...mockRepo,
      find: jest.fn().mockImplementation((request) => getFakeFileImages()),
    },
  };

  const mockConfigService = {
    get: jest.fn().mockImplementation(() => 'whatever'),
  };

  const mockS3 = {
    promise: jest.fn(),
    upload: jest.fn().mockReturnThis(),
    deleteObject: jest.fn().mockReturnThis(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImagesService,
        {
          provide: RepositoryWrapper,
          useValue: mockRepoWrapper,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: S3,
          useValue: mockS3,
        },
      ],
    }).compile();

    service = module.get<ImagesService>(ImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create public images', async () => {
    mockS3.promise = jest
      .fn()
      .mockResolvedValue({ Key: 'Key', Location: 'Location' });

    expect(await service.createPublicImages(getFakeFiles())).toEqual([
      { key: 'Key', url: 'Location' },
    ]);
    expect(mockS3.upload).toBeCalledTimes(1);
    expect(mockRepoWrapper.publicImages.createMany).toBeCalledTimes(1);
    expect(mockConfigService.get).toBeCalledTimes(1);
  });

  it('should delete public images', async () => {
    expect(
      await service.deletePublicImages(getFakePublicImages()),
    ).toBeUndefined();
    expect(mockS3.deleteObject).toBeCalledTimes(2);
    expect(mockRepoWrapper.publicImages.removeMany).toBeCalledTimes(1);
  });

  it('should create file images', async () => {
    expect(await service.createFileImages(getFakeFiles())).toEqual([
      { fileName: 'fileName.png' },
    ]);
    expect(mockRepoWrapper.fileImages.createMany).toBeCalledTimes(2);
  });

  it('should delete file images', async () => {
    expect(await service.deleteFileImages(getFakeFileImages())).toBeUndefined();
    expect(mockRepoWrapper.fileImages.removeMany).toBeCalledTimes(2);
  });

  it('should delete images by ids', async () => {
    const ids = [1, 2, 3];
    const deletePublicImagesSpy = jest.spyOn(service, 'deletePublicImages');
    const deleteFileImagesSpy = jest.spyOn(service, 'deleteFileImages');

    expect(await service.deleteImagesByIds(ids)).toBeUndefined();
    expect(mockRepoWrapper.publicImages.find).toBeCalledTimes(1);
    expect(mockRepoWrapper.fileImages.find).toBeCalledTimes(1);
    expect(deletePublicImagesSpy).toBeCalledTimes(1);
    expect(deleteFileImagesSpy).toBeCalledTimes(1);
  });
});

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

const getFakeS3CreatedObjectsData = (): { Key: string; Location: string }[] => {
  return [
    {
      Key: 'Key',
      Location: 'Location',
    },
    {
      Key: 'Keeey',
      Location: 'Locaaation',
    },
  ];
};

const getFakeFiles = (): Express.Multer.File[] => {
  return [
    {
      fieldname: 'fieldname',
      originalname: 'originalname.png',
      encoding: 'encoding',
      mimetype: 'image/png',
      size: 1337,
      stream: null,
      destination: 'destination',
      filename: 'filename',
      path: 'path',
      buffer: Buffer.alloc(256, '0'),
    },
  ];
};
