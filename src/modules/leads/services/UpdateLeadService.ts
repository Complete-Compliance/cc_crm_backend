import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Lead from '../infra/typeorm/entities/Lead';

import ILeadsRepository from '../repositories/ILeadsRepository';

interface IRequest {
  id: string;
  usdot?: string;
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
export default class UpdateLeadService {
  constructor(
    @inject('LeadsRepository')
    private leadsRepository: ILeadsRepository,
  ) {}

  public async execute({
    id,
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
    const lead = await this.leadsRepository.findById(id);

    if (!lead) {
      throw new AppError('No lead was found with given ID.');
    }

    if (usdot && usdot !== lead.usdot) {
      const leadExists = await this.leadsRepository.findByDOT(usdot);

      if (leadExists) {
        throw new AppError('Another lead with that DOT already exists');
      }
    }

    lead.usdot = usdot || lead.usdot;
    lead.entityType = entityType || lead.entityType;
    lead.operatingStatus = operatingStatus || lead.operatingStatus;
    lead.companyName = companyName || lead.companyName;
    lead.fullName = fullName || lead.fullName;
    lead.dbaName = dbaName || lead.dbaName;
    lead.primaryAddress = primaryAddress || lead.primaryAddress;
    lead.state = state || lead.state;
    lead.zipCode = zipCode || lead.zipCode;
    lead.altAddress = altAddress || lead.altAddress;
    lead.altState = altState || lead.altState;
    lead.altZipCode = altZipCode || lead.altZipCode;
    lead.phoneNumber = phoneNumber || lead.phoneNumber;
    lead.powerUnits = powerUnits || lead.powerUnits;
    lead.drivers = drivers || lead.drivers;
    lead.mcs150FormDate = mcs150FormDate || lead.mcs150FormDate;
    lead.operationClassification =
      operationClassification || lead.operationClassification;
    lead.carrierOperation = carrierOperation || lead.carrierOperation;
    lead.cargoCarried = cargoCarried || lead.cargoCarried;
    lead.email = email || lead.email;
    lead.bipdInsuranceRequired =
      bipdInsuranceRequired || lead.bipdInsuranceRequired;
    lead.cargoInsuranceRequired =
      cargoInsuranceRequired || lead.cargoInsuranceRequired;
    lead.bondInsuranceRequired =
      bondInsuranceRequired || lead.bondInsuranceRequired;
    lead.insuranceCarrier = insuranceCarrier || lead.insuranceCarrier;
    lead.policySurety = policySurety || lead.policySurety;
    lead.postedDate = postedDate || lead.postedDate;
    lead.coverageFrom = coverageFrom || lead.coverageFrom;
    lead.coverageTo = coverageTo || lead.coverageTo;
    lead.effectiveDate = effectiveDate || lead.effectiveDate;
    lead.cancellationDate = cancellationDate || lead.cancellationDate;

    const updatedLead = await this.leadsRepository.save(lead);

    return updatedLead;
  }
}
