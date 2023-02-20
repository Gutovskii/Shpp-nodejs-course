import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryWrapper } from 'src/repository/repository.wrapper';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { Role } from './role.entity';
import { Roles } from './roles.enum';
import { RolesService } from './roles.service';

describe('RolesService', () => {
  let service: RolesService;

  const mockRepoWrapper = {
    roles: {
      find: jest
        .fn()
        .mockImplementation((request) => Promise.resolve(getFakeRoles())),
      findOne: jest
        .fn()
        .mockImplementation(({ where: { name: roleName } }) =>
          Promise.resolve(getFakeRoleWithName(roleName)),
        ),
      create: jest
        .fn()
        .mockImplementation((role) =>
          Promise.resolve(getFakeRoleWithName(role.name)),
        ),
      remove: jest
        .fn()
        .mockImplementation((role) =>
          Promise.resolve(getFakeRoleWithName(role.name)),
        ),
    },
    users: {
      updateMany: jest
        .fn()
        .mockImplementation((users) => Promise.resolve(users)),
    },
  };

  const mockUsersService = {
    findByRoles: jest
      .fn()
      .mockImplementation((roles) =>
        Promise.resolve(getFakeUsersWithRoles(roles.map((role) => role.name))),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: RepositoryWrapper,
          useValue: mockRepoWrapper,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all roles', async () => {
    expect(await service.findAll()).toEqual(getFakeRoles());
    expect(mockRepoWrapper.roles.find).toBeCalledTimes(1);
  });

  it('should find a role by name', async () => {
    const roleName = Roles.USER;

    expect(await service.findByName(roleName)).toEqual(
      getFakeRoleWithName(roleName),
    );
    expect(mockRepoWrapper.roles.findOne).toBeCalledTimes(1);
  });

  it('should find roles by names', async () => {
    const roleNames = [Roles.USER, Roles.ADMIN];

    expect(await service.findByNames(...roleNames)).toEqual(
      getFakeRolesWithNames(...roleNames),
    );
    expect(mockRepoWrapper.roles.find).toBeCalledTimes(2);
  });

  it('should create a role', async () => {
    const roleName = Roles.USER;

    expect(await service.create(getFakeRoleWithName(roleName))).toEqual(
      getFakeRoleWithName(roleName),
    );
  });

  it('should delete a role', async () => {
    const roleName = 'GUEST';

    const roleFindByNameSpy = jest
      .spyOn(service, 'findByName')
      .mockReturnValue(Promise.resolve(getFakeRoleWithName(roleName)));

    expect(await service.delete(roleName)).toEqual(
      getFakeRoleWithName(roleName),
    );
    expect(roleFindByNameSpy).toBeCalledTimes(2);
    expect(mockUsersService.findByRoles).toBeCalledWith([roleName]);
    expect(mockUsersService.findByRoles).toBeCalledTimes(1);
    expect(mockRepoWrapper.users.updateMany).toBeCalledTimes(1);
    expect(mockRepoWrapper.roles.remove).toBeCalledTimes(1);
  });
});

const getFakeRoles = (): Role[] => {
  return [
    {
      id: 1,
      name: Roles.USER,
    },
    {
      id: 2,
      name: Roles.ADMIN,
    },
  ];
};

const getFakeRolesWithNames = (...roleNames: string[]): Role[] => {
  return roleNames.map((roleName, idx) => ({
    id: idx + 1,
    name: roleName,
  }));
};

const getFakeUsersWithRoles = (...roleNames: string[]): User[] => {
  return [
    {
      id: 1,
      username: 'Himars',
      hashPassword: 'very hashed password',
      roles: roleNames.map((roleName, idx) => ({
        id: idx + 1,
        name: roleName,
      })),
    },
    {
      id: 2,
      username: 'Leopard 2',
      hashPassword: 'sehr gehashtes Passwort',
      roles: roleNames.map((roleName, idx) => ({
        id: idx + 1,
        name: roleName,
      })),
    },
  ];
};

const getFakeRoleWithName = (roleName: string): Role => {
  return {
    id: 1,
    name: roleName,
  };
};
