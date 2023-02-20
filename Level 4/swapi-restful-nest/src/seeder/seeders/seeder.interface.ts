import { QueryRunner } from 'typeorm';

export interface SeederInterface {
  seed(): Promise<void>;
  truncate(queryRunner?: QueryRunner): Promise<void>;
}
