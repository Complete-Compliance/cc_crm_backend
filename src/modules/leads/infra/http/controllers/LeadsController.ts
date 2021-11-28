import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateLeadService from '@modules/leads/services/CreateLeadService';
import ListLeadsService from '@modules/leads/services/ListLeadsService';
import UpdateLeadService from '@modules/leads/services/UpdateLeadService';
import DeleteLeadService from '@modules/leads/services/DeleteLeadService';
import CountLeadsService from '@modules/leads/services/CountLeadsService';

export default class LeadsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
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
      bipdInsuranceOnFile,
      cargoInsuranceOnFile,
      bondInsuranceOnFile,
      insuranceCarrier,
      insuranceType,
      policySurety,
      postedDate,
      coverageFrom,
      coverageTo,
      effectiveDate,
      cancellationDate,
    } = request.body;

    const createLead = container.resolve(CreateLeadService);

    const lead = await createLead.execute({
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
      bipdInsuranceOnFile,
      cargoInsuranceOnFile,
      bondInsuranceOnFile,
      insuranceCarrier,
      insuranceType,
      policySurety,
      postedDate,
      coverageFrom,
      coverageTo,
      effectiveDate,
      cancellationDate,
    });

    return response.json(lead);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listLead = container.resolve(ListLeadsService);

    const lead = await listLead.execute({ id });

    return response.json(lead);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page, searchCriteria, emailType } = request.query;

    const listLeads = container.resolve(ListLeadsService);

    const leads = await listLeads.execute({
      page: page as string,
      searchCriteria: searchCriteria as string,
      emailType: emailType as string,
    });

    return response.json(leads);
  }

  public async count(request: Request, response: Response): Promise<Response> {
    const countLeads = container.resolve(CountLeadsService);

    const leadsQtd = await countLeads.execute();

    return response.json(leadsQtd);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
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
      bipdInsuranceOnFile,
      cargoInsuranceOnFile,
      bondInsuranceOnFile,
      insuranceCarrier,
      insuranceType,
      policySurety,
      postedDate,
      coverageFrom,
      coverageTo,
      effectiveDate,
      cancellationDate,
      mailtype,
    } = request.body;

    const updateLead = container.resolve(UpdateLeadService);

    const lead = await updateLead.execute({
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
      bipdInsuranceOnFile,
      cargoInsuranceOnFile,
      bondInsuranceOnFile,
      insuranceCarrier,
      insuranceType,
      policySurety,
      postedDate,
      coverageFrom,
      coverageTo,
      effectiveDate,
      cancellationDate,
      mailtype,
    });

    return response.json(lead);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteLead = container.resolve(DeleteLeadService);

    await deleteLead.execute(id);

    return response.json(204);
  }
}
