import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PartsService } from './parts.service';
import { CreateSparePartDto } from './dto/create-sparepart.dto';
import { UpdateSparePartDto } from './dto/update-sparepart.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('parts')
@UseGuards(JwtAuthGuard, RolesGuard) // 🔐 Auth obligatoire pour tout le module
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  // ay user
  @Get()
  findAll() {
    return this.partsService.findAll();
  }

  // admin kahaw
  @Post()
  @Roles('ADMIN')
  create(@Body() createSparePartDto: CreateSparePartDto) {
    return this.partsService.create(createSparePartDto);
  }

  // admin kahaw
  @Patch(':id')
  @Roles('ADMIN')
  update(
    @Param('id') id: string,
    @Body() updateSparePartDto: UpdateSparePartDto,
  ) {
    return this.partsService.update(+id, updateSparePartDto);
  }

  // admin barka 
  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.partsService.remove(+id);
  }
}
