import { Injectable, ForbiddenException, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, In } from 'typeorm';
import { Intervention } from './entities/intervention.entity';
import { CreateInterventionDto } from './dto/create-intervention.dto';
import { User } from '../users/entities/user.entity';
import { Device, DeviceStatus } from '../devices/entities/device.entity';
import { SparePart } from '../parts/entities/spare-part.entity';

@Injectable()
export class InterventionsService {
  constructor(
    @InjectRepository(Intervention) private interventionRepo: Repository<Intervention>,
    @InjectRepository(Device) private deviceRepo: Repository<Device>,
    @InjectRepository(SparePart) private sparePartRepo: Repository<SparePart>,
    private dataSource: DataSource,
  ) {}
   //fonction bech taamel intervention
  async create(dto: CreateInterventionDto, user: any) {
    // 1. Extraction de l'ID (on vérifie .id ET .sub car ton JWT utilise .sub)
    const userId = user?.id || user?.sub;

    if (!userId) {
      throw new ForbiddenException("Utilisateur non authentifié ou ID manquant dans le token");
    }
    
    // ken tech inajem yaamel intervention
    if (user.role !== 'TECH') {
      throw new ForbiddenException('Accès réservé aux techniciens (les Managers ne peuvent pas créer d\'interventions)');
    }

    // nchoufou ken device mawjoud
    const device = await this.deviceRepo.findOneBy({ id: dto.deviceId });
    if (!device) {
      throw new NotFoundException(`L'appareil avec l'ID ${dto.deviceId} n'existe pas`);
    }

    // transaction
    return this.dataSource.transaction(async (manager) => {
      let spareParts: SparePart[] = [];

      // ken user bech yestaamel piece nhotohom
      if (dto.sparePartIds && dto.sparePartIds.length > 0) {
        spareParts = await manager.find(SparePart, { 
          where: { id: In(dto.sparePartIds) } 
        });
          // ken piece mawjoudch kolha, eror 400
        if (spareParts.length !== dto.sparePartIds.length) {
          throw new BadRequestException('Une ou plusieurs pièces sont introuvables');
        }

        for (const part of spareParts) {
          if (part.stock < 1) {
            throw new BadRequestException(`Stock insuffisant pour la pièce : ${part.name}`);
          }
          // yonkos stock  (Transactionnel)
          await manager.decrement(SparePart, { id: part.id }, 'stock', 1);
        }
      }

      // nbdalou statut mtaa piece
      await manager.update(Device, { id: device.id }, { status: DeviceStatus.REPAIRING });

      // creation mtaa lintervention ken tech
      const intervention = manager.create(Intervention, {
        description: dto.description,
        technician: { id: userId } as User, // Utilisation du userId (sub) récupéré
        device: { id: device.id } as Device,
        spareParts: spareParts,
      });

      try {
        //  Sauvegarde 
        return await manager.save(Intervention, intervention);
      } catch (error) {
        console.error("ERREUR SQL LORS DU SAVE:", error.message);
        throw new BadRequestException(`Erreur de base de données : ${error.message}`);
      }
    });
  }
  // les intervention lkol
  async findAll() {
    return this.interventionRepo.find({
      relations: ['technician', 'device', 'spareParts'],
      order: { date: 'DESC' },
    });
  }
}
