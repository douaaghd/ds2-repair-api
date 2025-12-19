import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// Hedha eltableau elli bech yetssanaa fel-Base de données
@Entity()
export class SparePart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
