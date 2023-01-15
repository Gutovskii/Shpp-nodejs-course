import { Test, TestingModule } from '@nestjs/testing';
import { DeleteImagesDto } from './dto/delete-images.dto';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

describe('ImagesController', () => {
  let controller: ImagesController;

  const mockImagesService = {
    deleteImagesByIds: jest.fn().mockImplementation(dto => Promise.resolve())
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [{
        provide: ImagesService,
        useValue: mockImagesService
      }]
    }).compile();

    controller = module.get<ImagesController>(ImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should delete images by ids', async () => {
    expect(await controller.deleteImagesByIds(getFakeDeleteImagesDto())).toBeUndefined();
  });
});

const getFakeDeleteImagesDto = (): DeleteImagesDto => {
  return {
    imagesIds: [1, 2, 3]
  }
}
