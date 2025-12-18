import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
  ) {}

  // POST /devices
  create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const device = this.deviceRepository.create(createDeviceDto);
    return this.deviceRepository.save(device);
  }

  // GET /devices
  findAll(): Promise<Device[]> {
    return this.deviceRepository.find();
  }

  // DELETE /devices/:id (ADMIN)
  async remove(id: number): Promise<void> {
    const result = await this.deviceRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Device not found');
    }
  }
}
