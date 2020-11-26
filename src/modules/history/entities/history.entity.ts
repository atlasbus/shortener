import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LinkEntity } from '../../link/entities';
import { IHistory } from '../interfaces';

@Entity({ name: 'history' })
export class HistoryEntity implements IHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  userAgent: string;

  @Column({ type: 'text' })
  query: Record<string, string>;

  @JoinColumn({ name: 'linkId' })
  @ManyToOne(() => LinkEntity, (link) => link.history, { nullable: false })
  link: LinkEntity;

  @Column({ nullable: false })
  linkId: number;

  @CreateDateColumn()
  createdAt: Date;
}
