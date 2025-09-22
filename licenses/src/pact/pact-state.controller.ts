import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { PactStateService } from './pact-state.service';

interface PactStateRequest {
  state?: string;
  params?: Record<string, unknown>;
}

@Controller('_pactState')
export class PactStateController {
  constructor(private readonly pactStateService: PactStateService) {}

  @Post()
  async setState(@Body() body: PactStateRequest) {
    if (!body.state) {
      throw new BadRequestException('state is required');
    }

    await this.pactStateService.apply(body.state, body.params);
    return { state: body.state };
  }
}
