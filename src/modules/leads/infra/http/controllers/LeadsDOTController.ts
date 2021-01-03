import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindLeadByDotService from '@modules/leads/services/FindLeadByDotService';

import DeleteBosta from '@modules/leads/services/DeleteTestLeadsService';

export default class LeadsDOTController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { dot } = request.body;

    const findLead = container.resolve(FindLeadByDotService);

    const lead = await findLead.execute(dot);

    return response.json(lead);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteLeads = container.resolve(DeleteBosta);

    await deleteLeads.execute();

    return response.status(204);
  }
}
