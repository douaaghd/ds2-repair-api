import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSparePartDto } from './dto/create-sparepart.dto';
import { UpdateSparePartDto } from './dto/update-sparepart.dto';


export interface SparePart {
  id: number;
  name: string;
  stock: number;
  price: number;
}

@Injectable()
export class PartsService {
  private parts: SparePart[] = [];

  // GET /parts
  findAll(): SparePart[] {
    return this.parts;
  }

  // POST /parts
  create(createSparePartDto: CreateSparePartDto): SparePart {
    const part: SparePart = {
      id: this.parts.length + 1,
      name: createSparePartDto.name,
      stock: createSparePartDto.stock,
      price: createSparePartDto.price,
    };

    this.parts.push(part);
    return part;
  }

  // PATCH /parts/:id
  update(id: number, updateSparePartDto: UpdateSparePartDto): SparePart {
    const part = this.parts.find((p) => p.id === id);

    if (!part) {
      throw new NotFoundException('Spare part not found');
    }

    if (updateSparePartDto.stock !== undefined) {
      part.stock = updateSparePartDto.stock;
    }

    if (updateSparePartDto.price !== undefined) {
      part.price = updateSparePartDto.price;
    }

    return part;
  }

  // DELETE /parts/:id
  remove(id: number): void {
    const index = this.parts.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new NotFoundException('Spare part not found');
    }

    this.parts.splice(index, 1);
  }
}
