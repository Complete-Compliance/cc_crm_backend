import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Lead from '../infra/typeorm/entities/Lead';

import ILeadsRepository from '../repositories/ILeadsRepository';

interface IRequest {
  usdot: string;
  entityType?: string;
  operatingStatus?: string;
  companyName?: string;
  fullName?: string;
  dbaName?: string;
  primaryAddress?: string;
  state?: string;
  zipCode?: string;
  altAddress?: string;
  altState?: string;
  altZipCode?: string;
  phoneNumber?: string;
  powerUnits?: string;
  drivers?: string;
  mcs150FormDate?: string;
  operationClassification?: string;
  carrierOperation?: string;
  cargoCarried?: string;
  email?: string;
  bipdInsuranceRequired?: string;
  cargoInsuranceRequired?: string;
  bondInsuranceRequired?: string;
  insuranceCarrier?: string;
  policySurety?: string;
  postedDate?: string;
  coverageFrom?: string;
  coverageTo?: string;
  effectiveDate?: string;
  cancellationDate?: string;
}

@injectable()
export default class CreateLeadService {
  constructor(
    @inject('LeadsRepository')
    private leadsRepository: ILeadsRepository,
  ) {}

  public async execute({
    usdot,
    entityType,
    operatingStatus,
    companyName,
    fullName,
    dbaName,
    primaryAddress,
    state,
    zipCode,
    altAddress,
    altState,
    altZipCode,
    phoneNumber,
    powerUnits,
    drivers,
    mcs150FormDate,
    operationClassification,
    carrierOperation,
    cargoCarried,
    email,
    bipdInsuranceRequired,
    cargoInsuranceRequired,
    bondInsuranceRequired,
    insuranceCarrier,
    policySurety,
    postedDate,
    coverageFrom,
    coverageTo,
    effectiveDate,
    cancellationDate,
  }: IRequest): Promise<Lead> {
    if (!usdot.length) {
      throw new AppError("Can't create a lead without USDOT");
    }

    const leadExists = await this.leadsRepository.findByDOT(usdot);

    if (leadExists) {
      throw new AppError('This lead already exists');
    }

    const lead = await this.leadsRepository.create({
      usdot,
      entityType,
      operatingStatus,
      companyName,
      fullName,
      dbaName,
      primaryAddress,
      state,
      zipCode,
      altAddress,
      altState,
      altZipCode,
      phoneNumber,
      powerUnits,
      drivers,
      mcs150FormDate,
      operationClassification,
      carrierOperation,
      cargoCarried,
      email,
      bipdInsuranceRequired,
      cargoInsuranceRequired,
      bondInsuranceRequired,
      insuranceCarrier,
      policySurety,
      postedDate,
      coverageFrom,
      coverageTo,
      effectiveDate,
      cancellationDate,
    });

    return lead;
  }
}
