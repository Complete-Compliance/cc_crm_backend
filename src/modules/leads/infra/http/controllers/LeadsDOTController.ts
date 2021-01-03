import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindLeadByDotService from '@modules/leads/services/FindLeadByDotService';

export default class LeadsDOTController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { dot } = request.body;

    const findLead = container.resolve(FindLeadByDotService);

    const lead = await findLead.execute(dot);

    return response.json(lead);
  }
}
