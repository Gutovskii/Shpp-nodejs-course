import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResult } from 'src/common/classes/pagination.class';
import { RepositoryWrapper } from 'src/repository/repository.wrapper';
import { Role } from '../roles/role.entity';
import { Roles } from '../roles/roles.enum';
import { RolesService } from '../roles/roles.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockRolesService = {
    findByName: jest.fn().mockImplementation(roleName => Promise.resolve(getFakeRoleWithName(roleName)))
  }

  const mockRepoWrapper = {
    users: {
      findByPage: jest.fn().mockImplementation((page, count) => Promise.resolve(getFakeUsersByPage(page, count))),
      find: jest.fn().mockImplementation(request => Promise.resolve(getFakeUsers())),
      findOne: jest.fn().mockImplementation(({where: { username }}) => Promise.resolve(getFakeUserWithName(username))),
      remove: jest.fn().mockImplementation(user => Promise.resolve(user)),
      save: jest.fn().mockImplementation(user => Promise.resolve(user))
    },
    roles: {
      create: jest.fn().mockImplementation(role => Promise.resolve(role))
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: RolesService,
          useValue: mockRolesService
        },
        {
          provide: RepositoryWrapper,
          useValue: mockRepoWrapper
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find users by page', async () => {
    const page = 1;
    const count = 3;

    expect(await service.findByPage(page, count)).toEqual(getFakeUsersByPage(page, count));
    expect(mockRepoWrapper.users.findByPage).toBeCalledTimes(1);
  });

  it('should find users by roles', async () => {
    const roleNames = [Roles.USER, Roles.ADMIN];

    expect(await service.findByRoles(roleNames)).toEqual(getFakeUsers());
    expect(mockRepoWrapper.users.find).toBeCalledTimes(1);
  });

  it('should find a user by name', async () => {
    const username = 'username';

    expect(await service.findByName(username)).toEqual(getFakeUserWithName(username));
    expect(mockRepoWrapper.users.findOne).toBeCalledTimes(1);
  });

  it('should delete a user by name', async () => {
    const username = 'username';

    expect(await service.deleteByName(username)).toEqual(getFakeUserWithName(username));
    expect(mockRepoWrapper.users.remove).toBeCalledTimes(1);
  });
  
  

  it('should add role to a user (without role creating)', async () => {
    const username = 'username';
    const roleName = Roles.USER;
    
    const expectedUser = getFakeUserWithName(username);
    expectedUser.roles.push(getFakeRoleWithName(roleName));

    const userFindByNameSpy = 
      jest.spyOn(service, 'findByName')
      .mockImplementation(username => Promise.resolve(getFakeUserWithName(username)))

    expect(await service.addRole(username, roleName)).toEqual(expectedUser);
    expect(userFindByNameSpy).toBeCalledTimes(1);
    expect(mockRolesService.findByName).toBeCalledTimes(1);
    expect(mockRepoWrapper.roles.create).toBeCalledTimes(0);
    expect(mockRepoWrapper.users.save).toBeCalledTimes(1);
  });

  it('should add role to a user (with role creating)', async () => {
    const username = 'username';
    const roleName = Roles.USER;
    
    const expectedUser = getFakeUserWithName(username);
    expectedUser.roles.push({id: undefined, name: roleName});

    mockRolesService.findByName = jest.fn().mockResolvedValue(null);

    const userFindByNameSpy = 
      jest.spyOn(service, 'findByName')
      .mockImplementation(username => Promise.resolve(getFakeUserWithName(username)))

    expect(await service.addRole(username, roleName)).toEqual(expectedUser);
    expect(userFindByNameSpy).toBeCalledTimes(1);
    expect(mockRolesService.findByName).toBeCalledTimes(1);
    expect(mockRepoWrapper.roles.create).toBeCalledTimes(1);
    expect(mockRepoWrapper.users.save).toBeCalledTimes(2);
  });
  
  it('should remove a role from a user (removing admin role -> remains last user)', async () => {
    const username = 'username';
    const roleName = Roles.ADMIN;

    mockRolesService.findByName = jest.fn().mockImplementation(userRoleName => Promise.resolve(getFakeRoleWithName(Roles.USER)));

    const userFindByNameSpy = 
      jest.spyOn(service, 'findByName')
      .mockImplementation(username => Promise.resolve({
        ...getFakeUserWithName(username),
        roles: [getFakeRoleWithName(Roles.USER), getFakeRoleWithName(Roles.ADMIN)]
      }));

    expect(await service.removeRole(username, roleName)).toEqual({
      ...getFakeUserWithName(username),
      roles: [getFakeRoleWithName(Roles.USER)]
    });
    expect(userFindByNameSpy).toBeCalledTimes(1);
    expect(mockRolesService.findByName).toBeCalledTimes(0)
    expect(mockRepoWrapper.users.save).toBeCalledTimes(3);
  });

  it('should remove a role from a user (removing last admin role -> getting user)', async () => {
    const username = 'username';
    const roleName = Roles.ADMIN;

    mockRolesService.findByName = jest.fn().mockImplementation(userRoleName => Promise.resolve(getFakeRoleWithName(Roles.USER)));

    const userFindByNameSpy = 
      jest.spyOn(service, 'findByName')
      .mockImplementation(username => Promise.resolve({
        ...getFakeUserWithName(username),
        roles: [getFakeRoleWithName(Roles.ADMIN)]
      }));

    expect(await service.removeRole(username, roleName)).toEqual({
      ...getFakeUserWithName(username),
      roles: [getFakeRoleWithName(Roles.USER)]
    });
    expect(userFindByNameSpy).toBeCalledTimes(1);
    expect(mockRolesService.findByName).toBeCalledTimes(1)
    expect(mockRepoWrapper.users.save).toBeCalledTimes(4);
  });
});

const getFakeUsersByPage = (page: number, count: number): 
  PaginationResult<Omit<User, 'roles'>> => {
  return {
    partOfEntities: new Array(count).fill(null).map((person, idx) => ({
      id: idx + 1,
      username: 'veryUniqueUsername',
      hashPassword: 'veryHashedPassword'
    })),
    totalCount: count
  }
}

const getFakeUsers = (): User[] => {
  return [
    {
      id: 1,
      username: 'Himars',
      hashPassword: 'very hashed password',
      roles: []
    },
    {
      id: 2,
      username: 'Leopard 2',
      hashPassword: 'sehr gehashtes Passwort',
      roles: []
    }
  ];
}

const getFakeUserWithName = (username: string): User => {
  return {
    id: 1,
    username,
    hashPassword: 'hashPassword',
    roles: []
  }
}

const getFakeRoleWithName = (roleName: string): Role => {
  return {
    id: 1,
    name: roleName
  }
}