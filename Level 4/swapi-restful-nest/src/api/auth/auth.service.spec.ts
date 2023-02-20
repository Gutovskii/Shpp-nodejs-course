import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryWrapper } from 'src/repository/repository.wrapper';
import { Role } from '../roles/role.entity';
import { Roles } from '../roles/roles.enum';
import { RolesService } from '../roles/roles.service';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

jest.mock('bcryptjs', () => {
  const originalModule = jest.requireActual('bcryptjs');

  return {
    __esModule: true,
    ...originalModule,
    compare: jest
      .fn()
      .mockImplementation((password, hashPassword) => Promise.resolve(true)),
    hash: jest
      .fn()
      .mockImplementation((password, salt) => Promise.resolve('hash')),
  };
});

describe('AuthService', () => {
  let service: AuthService;

  const mockRepoWrapper = {
    users: {
      create: jest
        .fn()
        .mockImplementation((user) =>
          Promise.resolve(getFakeUserWithName(user.username)),
        ),
    },
  };

  const mockUsersService = {
    findByName: jest.fn().mockImplementation((username, ignoreExistance) => {
      return ignoreExistance
        ? Promise.resolve(null)
        : Promise.resolve(getFakeUserWithName(username));
    }),
  };

  const mockJwtService = {
    signAsync: jest
      .fn()
      .mockImplementation((payload) => Promise.resolve('token')),
  };

  const mockRolesService = {
    findByNames: jest
      .fn()
      .mockImplementation((...roles) =>
        Promise.resolve(getFakeRolesWithNames(roles)),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: RepositoryWrapper,
          useValue: mockRepoWrapper,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: RolesService,
          useValue: mockRolesService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should login a user', async () => {
    const username = 'username';
    const password = 'password';

    expect(await service.login(username, password)).toEqual('token');
    expect(mockUsersService.findByName).toBeCalledWith(username);
    expect(mockUsersService.findByName).toBeCalledTimes(1);
    expect(mockJwtService.signAsync).toBeCalledTimes(1);
  });

  it('should register a user', async () => {
    const username = 'username';
    const password = 'password';

    expect(await service.register(username, password)).toEqual('token');
    expect(mockUsersService.findByName).toBeCalledWith(username, true);
    expect(mockUsersService.findByName).toBeCalledTimes(2);
    expect(mockRolesService.findByNames).toBeCalledWith(Roles.USER);
    expect(mockRolesService.findByNames).toBeCalledTimes(1);
    expect(mockRepoWrapper.users.create).toBeCalledTimes(1);
    expect(mockJwtService.signAsync).toBeCalledTimes(2);
  });
});

const getFakeUserWithName = (username: string): User => {
  return {
    id: 1,
    username,
    hashPassword: 'hashPassword',
    roles: [],
  };
};

const getFakeRolesWithNames = (...roleNames: string[]): Role[] => {
  return roleNames.map((roleName, idx) => ({
    id: idx,
    name: roleName,
  }));
};
