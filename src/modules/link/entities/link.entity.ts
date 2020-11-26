import { HistoryEntity } from 'src/modules/history/entities';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ILink } from '../interfaces';

@Entity({ name: 'links' })
@Index(['slug', 'domain'], { unique: true })
export class LinkEntity implements ILink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  slug: string;

  @Column({ type: 'varchar', nullable: false })
  domain: string;

  @Column({ type: 'text', nullable: false })
  url: string;

  @OneToMany(() => HistoryEntity, (history) => history.link)
  history: HistoryEntity[];

  @Column({ type: 'int8', nullable: false, default: 0 })
  totalClicks: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
