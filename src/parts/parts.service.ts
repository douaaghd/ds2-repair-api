import { Injectable } from '@nestjs/common';
import { CreateSparePartDto } from './dto/create-sparepart.dto';

export interface SparePart extends CreateSparePartDto {
  id: number;
}

@Injectable()
export class PartsService {
  private parts: SparePart[] = []; // type complet

  findAll(): SparePart[] {
    return this.parts;
  }

  create(createSparePartDto: CreateSparePartDto): SparePart {
    const part: SparePart = { id: this.parts.length + 1, ...createSparePartDto };
    this.parts.push(part);
    return part;
  }
}
