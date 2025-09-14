import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
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
  create(@Body() createLicenseDto: CreateLicenseDto) {
    return this.licensesService.create(createLicenseDto);
  }

  @Get()
  findAll(@Query() query: LicenseQueryDto) {
    return this.licensesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.licensesService.findOne(id);
  }

  @Get(':id/verify')
  verify(@Param('id', ParseUUIDPipe) id: string) {
    return this.licensesService.verifyExistense(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateLicenseDto: UpdateLicenseDto,
  ) {
    return this.licensesService.update(id, updateLicenseDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.licensesService.remove(id);
  }
}
