import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('scrap_processes')
export default class ScrapProcess {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  startDot: string;

  @Column()
  endDot: string;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
