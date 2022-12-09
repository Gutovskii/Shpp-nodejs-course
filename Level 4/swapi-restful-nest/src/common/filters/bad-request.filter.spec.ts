import { BadRequestFilter } from './bad-request.filter';

describe('CommonFilter', () => {
  it('should be defined', () => {
    expect(new BadRequestFilter()).toBeDefined();
  });
});
