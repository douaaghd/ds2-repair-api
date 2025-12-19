import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Device } from '../../devices/entities/device.entity';
import { SparePart } from '../../parts/entities/spare-part.entity';

@Entity()
export class Intervention {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  date: Date;

  @Column({ type: 'text' }) 
  description: string;

  @ManyToOne(() => User, { eager: true, onDelete: 'SET NULL' }) //pour eviter enou intervention tetfasakh ken teck tfasakh
  technician: User;

  @ManyToOne(() => Device, { eager: true, onDelete: 'CASCADE' }) // nfaskhou interventions ken device mafaskha zeda
  device: Device;

 
  @ManyToMany(() => SparePart, { eager: true }) 
  @JoinTable({ name: 'intervention_parts' }) 
  spareParts: SparePart[];
}