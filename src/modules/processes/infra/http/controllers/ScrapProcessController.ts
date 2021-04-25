import CreateScrapProcessService from '@modules/processes/services/CreateScrapProcessService';
import ListScrapProcessesService from '@modules/processes/services/ListScrapProcessesService';
import UpdateScrapProcessService from '@modules/processes/services/UpdateScrapProcessService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ScrapProcessController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { startDot, endDot } = request.body;

    const createScrapProcess = container.resolve(CreateScrapProcessService);

    const process = await createScrapProcess.execute({ startDot, endDot });

    return response.json(process);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, startDot, endDot, status } = request.body;

    const updateScrapProcess = container.resolve(UpdateScrapProcessService);

    const process = await updateScrapProcess.execute({
      id,
      startDot,
      endDot,
      status,
    });

    return response.json(process);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    const listScrapProcesses = container.resolve(ListScrapProcessesService);

    const process = await listScrapProcesses.execute(id as string);

    return response.json(process);
  }
}
