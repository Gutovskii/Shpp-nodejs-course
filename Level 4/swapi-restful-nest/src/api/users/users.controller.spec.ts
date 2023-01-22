import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResult } from 'src/common/classes/pagination.class';
import { Role } from '../roles/role.entity';
import { Roles } from '../roles/roles.enum';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    findByPage: jest.fn().mockImplementation((page, count) => Promise.resolve(getFakeUsersByPage(page, count))),
    findByName: jest.fn().mockImplementation(username => Promise.resolve(getFakeUserWithName(username))),
    deleteByName: jest.fn().mockImplementation(username => Promise.resolve(getFakeUserWithName(username))),
    addRole: jest.fn().mockImplementation((username, roleName) => Promise.resolve({
      ...getFakeUserWithName(username),
      roles: [getFakeRoleWithName(roleName)]
    })),
    removeRole: jest.fn().mockImplementation((username, roleName) => Promise.resolve({
      ...getFakeUserWithName(username),
      roles: [getFakeRoleWithName(Roles.USER)]
    }))
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService
        }
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find users by page', async () => {
    const page = 1;
    const count = 3;

    expect(await controller.findByPage(page, count)).toEqual(getFakeUsersByPage(page, count));
    expect(mockUsersService.findByPage).toBeCalledTimes(1);
  });

  it('should find a user by username', async () => {
    const username = 'username';

    expect(await controller.findByName(username)).toEqual(getFakeUserWithName(username));
    expect(mockUsersService.findByName).toBeCalledTimes(1);
  });

  it('should delete a user by username', async () => {
    const username = 'username';

    expect(await controller.deleteUser(username)).toEqual(getFakeUserWithName(username));
    expect(mockUsersService.deleteByName).toBeCalledTimes(1);
  });

  it('should add role to a user', async () => {
    const username = 'username';
    const roleName = Roles.ADMIN;

    expect(await controller.addRole(username, roleName)).toEqual({
      ...getFakeUserWithName(username),
      roles: [getFakeRoleWithName(roleName)]
    });
    expect(mockUsersService.addRole).toBeCalledTimes(1);
  });

  it('should remove role from a user', async () => {
    const username = 'username';
    const roleName = Roles.ADMIN;

    expect(await controller.removeRole(username, roleName)).toEqual({
      ...getFakeUserWithName(username),
      roles: [getFakeRoleWithName(Roles.USER)]
    });
    expect(mockUsersService.removeRole).toBeCalledTimes(1);
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