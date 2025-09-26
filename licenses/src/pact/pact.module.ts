import { Module } from '@nestjs/common';
import { PactStateController } from './pact-state.controller';
import { PactStateService } from './pact-state.service';

@Module({
  controllers: [PactStateController],
  providers: [PactStateService],
})
export class PactModule {}
