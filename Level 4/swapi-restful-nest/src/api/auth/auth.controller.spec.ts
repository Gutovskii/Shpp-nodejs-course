import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return token from login', async () => {
    const userJwtToken = { token: 'token' };

    expect(await controller.login(userJwtToken)).toEqual(userJwtToken);
  });

  it('should return token from register', async () => {
    const userJwtToken = { token: 'token' };

    expect(await controller.register(userJwtToken)).toEqual(userJwtToken);
  });
});
