import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { LicensesService } from './licenses.service';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { LicenseQueryDto } from './dto/license-query.dto';
import {
  InvalidDaysError,
  LicenseInvalidError,
  LicenseNotFoundError,
} from './errors/license.errors';

@Controller('licenses')
export class LicensesController {
  constructor(private readonly licensesService: LicensesService) {}

  @Post()
  async create(@Body() createLicenseDto: CreateLicenseDto) {
    try {
      const license = await this.licensesService.create(createLicenseDto);
      return this.licensesService.toResponse(license);
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Get()
  async findAll(@Query() query: LicenseQueryDto) {
    try {
      const licenses = await this.licensesService.findAll(query);
      return this.licensesService.toResponses(licenses);
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const license = await this.licensesService.findOne(id);
      return this.licensesService.toResponse(license);
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Get(':id/verify')
  async verify(@Param('id') id: string) {
    try {
      return await this.licensesService.verifyExistense(id);
    } catch (error) {
      if (
        error instanceof LicenseInvalidError ||
        error instanceof LicenseNotFoundError
      ) {
        throw new HttpException({ valid: false }, HttpStatus.NOT_FOUND);
      }
      return this.handleError(error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLicenseDto: UpdateLicenseDto,
  ) {
    try {
      const license = await this.licensesService.update(id, updateLicenseDto);
      return this.licensesService.toResponse(license);
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const license = await this.licensesService.remove(id);
      return this.licensesService.toResponse(license);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): never {
    if (error instanceof InvalidDaysError) {
      throw new HttpException(
        { error: 'INVALID_DAYS' },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (error instanceof LicenseNotFoundError) {
      throw new HttpException({ error: 'NOT_FOUND' }, HttpStatus.NOT_FOUND);
    }
    if (error instanceof LicenseInvalidError) {
      throw new HttpException({ valid: false }, HttpStatus.NOT_FOUND);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error));
  }
}
