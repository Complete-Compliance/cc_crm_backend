import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('leads')
export default class Lead {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  usdot: string;

  @Column()
  entityType: string;

  @Column()
  operatingStatus: string;

  @Column()
  companyName: string;

  @Column()
  fullName: string;

  @Column()
  dbaName: string;

  @Column()
  primaryAddress: string;

  @Column()
  state: string;

  @Column()
  zipCode: string;

  @Column()
  altAddress: string;

  @Column()
  altState: string;

  @Column()
  altZipCode: string;

  @Column()
  phoneNumber: string;

  @Column()
  powerUnits: string;

  @Column()
  drivers: string;

  @Column()
  mcs150FormDate: string;

  @Column()
  operationClassification: string;

  @Column()
  carrierOperation: string;

  @Column()
  cargoCarried: string;

  @Column()
  email: string;

  @Column()
  bipdInsuranceRequired: string;

  @Column()
  cargoInsuranceRequired: string;

  @Column()
  bondInsuranceRequired: string;

  @Column()
  bipdInsuranceOnFile: string;

  @Column()
  cargoInsuranceOnFile: string;

  @Column()
  bondInsuranceOnFile: string;

  @Column()
  insuranceCarrier: string;

  @Column()
  insuranceType: string;

  @Column()
  policySurety: string;

  @Column()
  postedDate: string;

  @Column()
  coverageFrom: string;

  @Column()
  coverageTo: string;

  @Column()
  effectiveDate: string;

  @Column()
  cancellationDate: string;

  @Column()
  mailtype: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
