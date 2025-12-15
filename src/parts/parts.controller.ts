import { Controller, Get, Post, Body } from '@nestjs/common';
import { PartsService } from './parts.service';
import { CreateSparePartDto } from './dto/create-sparepart.dto';

@Controller('parts')
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @Get()
  findAll() {
    return this.partsService.findAll();
  }

  @Post()
  create(@Body() createSparePartDto: CreateSparePartDto) {
    return this.partsService.create(createSparePartDto);
  }
}
