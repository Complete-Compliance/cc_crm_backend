import ScrapByRangeService from '@modules/processes/services/ScrapByRangeService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ScrapByRangeController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { category } = request.query;
    const { id } = request.params;

    const createScrapProcess = container.resolve(ScrapByRangeService);

    await createScrapProcess.execute({ id, category: category as string });

    return response.sendStatus(204);
  }
}
