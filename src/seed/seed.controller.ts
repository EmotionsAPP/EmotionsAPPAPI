import { Controller, Delete } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

import { SeedService } from './seed.service';

@ApiExcludeController()
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Delete()
  cleanDataBase() {
    this.seedService.cleanDataBase();
  }
}
