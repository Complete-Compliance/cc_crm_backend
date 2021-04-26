import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { Expose } from 'class-transformer';

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

  // @Expose({ name: 'formatedCreatedAt' })
  // formatCreatedAt(): string {
  //   const timezonedDate = new Date(this.createdAt.getHours() - 4);

  //   const formatedDate = `${timezonedDate.toDateString()}-${timezonedDate.toTimeString()}`;

  //   return formatedDate;
  // }

  @UpdateDateColumn()
  updatedAt: Date;

  // @Expose({ name: 'formatedUpdatedAt' })
  // formatUpdatedAt(): string {
  //   const formatedDate = `${
  //     this.updatedAt.toISOString().split('T')[0]
  //   }-${this.updatedAt.toTimeString()}`;

  //   return formatedDate;
  // }
}
