import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateLeadService from '@modules/leads/services/CreateLeadService';
import ListLeadsService from '@modules/leads/services/ListLeadsService';
import UpdateLeadService from '@modules/leads/services/UpdateLeadService';
import DeleteLeadService from '@modules/leads/services/DeleteLeadService';

export default class LeadsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      usdot,
      entityType,
      operatingStatus,
      companyName,
      fullName,
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
    } = request.body;

    const createLead = container.resolve(CreateLeadService);

    const lead = await createLead.execute({
      usdot,
      entityType,
      operatingStatus,
      companyName,
      fullName,
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

    return response.json(lead);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listLead = container.resolve(ListLeadsService);

    const lead = await listLead.execute(id);

    return response.json(lead);
  }

  public async index(_request: Request, response: Response): Promise<Response> {
    const listLeads = container.resolve(ListLeadsService);

    const leads = await listLeads.execute();

    return response.json(leads);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      usdot,
      entityType,
      operatingStatus,
      companyName,
      fullName,
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
    } = request.body;

    const updateLead = container.resolve(UpdateLeadService);

    const lead = await updateLead.execute({
      id,
      usdot,
      entityType,
      operatingStatus,
      companyName,
      fullName,
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

    return response.json(lead);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteLead = container.resolve(DeleteLeadService);

    await deleteLead.execute(id);

    return response.json(204);
  }
}
