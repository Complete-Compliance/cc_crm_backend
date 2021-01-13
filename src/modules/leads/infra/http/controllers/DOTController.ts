import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetHighestDOTLeadService from '@modules/leads/services/GetHighestDOTLeadService';

export default class DOTController {
  public async show(request: Request, response: Response): Promise<Response> {
    const findHighestDOT = container.resolve(GetHighestDOTLeadService);

    const dot = await findHighestDOT.execute();

    return response.json(dot);
  }
}
