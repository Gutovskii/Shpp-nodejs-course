import { getMapperToken } from '@automapper/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from './role.entity';
import { RolesController } from './roles.controller';
import { Roles } from './roles.enum';
import { RolesService } from './roles.service';

describe('RolesController', () => {
  let controller: RolesController;

  const mockRolesService = {
    findAll: jest.fn().mockImplementation(() => Promise.resolve(getFakeRoles())),
    delete: jest.fn().mockImplementation(roleName => Promise.resolve(getFakeRoleWithName(roleName)))
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        {
          provide: RolesService,
          useValue: mockRolesService
        }
      ]
    }).compile();

    controller = module.get<RolesController>(RolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all roles', async () => {
    expect(await controller.findAll()).toEqual(getFakeRoles());
    expect(mockRolesService.findAll).toBeCalledTimes(1);
  });

  it('should delete a role', async () => {
    const roleName = 'GUEST';

    expect(await controller.deleteRole(roleName)).toEqual(getFakeRoleWithName(roleName));
    expect(mockRolesService.delete).toBeCalledTimes(1);
  });
});

const getFakeRoles = (): Role[] => {
  return [
    {
      id: 1,
      name: Roles.USER
    },
    {
      id: 2,
      name: Roles.ADMIN
    }
  ];
}

const getFakeRoleWithName = (roleName: string): Role => {
  return {
    id: 1,
    name: roleName
  }
}