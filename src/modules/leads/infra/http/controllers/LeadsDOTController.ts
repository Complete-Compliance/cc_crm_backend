import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindLeadByDotService from '@modules/leads/services/FindLeadByDotService';

export default class LeadsDOTController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { searchCriteria, dot, page } = request.query;

    const findLead = container.resolve(FindLeadByDotService);

    const lead = await findLead.execute({
      dot: dot as string,
      searchCriteria: searchCriteria as string,
      page: page as string,
    });

    return response.json(lead);
  }
}
