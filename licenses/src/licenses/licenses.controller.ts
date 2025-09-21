import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { LicensesService } from './licenses.service';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { LicenseQueryDto } from './dto/license-query.dto';

@Controller('licenses')
export class LicensesController {
  constructor(private readonly licensesService: LicensesService) {}

  @Post()
  async create(@Body() createLicenseDto: CreateLicenseDto) {
    const license = await this.licensesService.create(createLicenseDto);
    return this.licensesService.toResponse(license);
  }

  @Get()
  async findAll(@Query() query: LicenseQueryDto) {
    const licenses = await this.licensesService.findAll(query);
    return this.licensesService.toResponses(licenses);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const license = await this.licensesService.findOne(id);
    return this.licensesService.toResponse(license);
  }

  @Get(':id/verify')
  verify(@Param('id') id: string) {
    return this.licensesService.verifyExistense(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLicenseDto: UpdateLicenseDto,
  ) {
    const license = await this.licensesService.update(id, updateLicenseDto);
    return this.licensesService.toResponse(license);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const license = await this.licensesService.remove(id);
    return this.licensesService.toResponse(license);
  }
}
