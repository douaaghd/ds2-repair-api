import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SparePart } from './entities/spare-part.entity';
import { CreateSparePartDto } from './dto/create-sparepart.dto';
import { UpdateSparePartDto } from './dto/update-sparepart.dto';

@Injectable()
export class PartsService {
  constructor(
    @InjectRepository(SparePart)
    private readonly sparePartRepository: Repository<SparePart>,
  ) {}

  // GET /parts
  findAll(): Promise<SparePart[]> {
    return this.sparePartRepository.find();
  }

  // POST /parts (ADMIN)
  create(createSparePartDto: CreateSparePartDto): Promise<SparePart> {
    const part = this.sparePartRepository.create(createSparePartDto);
    return this.sparePartRepository.save(part);
  }

  // PATCH /parts/:id (ADMIN)
  async update(
    id: number,
    updateSparePartDto: UpdateSparePartDto,
  ): Promise<SparePart> {
    const part = await this.sparePartRepository.findOne({
      where: { id },
    });

    if (!part) {
      throw new NotFoundException('Spare part not found');
    }

    Object.assign(part, updateSparePartDto);
    return this.sparePartRepository.save(part);
  }

  // DELETE /parts/:id (ADMIN)
  async remove(id: number): Promise<void> {
    const result = await this.sparePartRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Spare part not found');
    }
  }
}
