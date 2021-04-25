import ScrapByRangeService from '@modules/processes/services/ScrapByRangeService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ScrapByRangeController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const createScrapProcess = container.resolve(ScrapByRangeService);

    await createScrapProcess.execute({ id });

    return response.sendStatus(204);
  }
}
