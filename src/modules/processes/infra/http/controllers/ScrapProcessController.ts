import CreateScrapProcessService from '@modules/processes/services/CreateScrapProcessService';
import DeleteScrapProcessService from '@modules/processes/services/DeleteScrapProcessService';
import ListScrapProcessesService from '@modules/processes/services/ListScrapProcessesService';
import UpdateScrapProcessService from '@modules/processes/services/UpdateScrapProcessService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

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

    // return response.json(classToClass(process));
    return response.json(process);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProcess = container.resolve(DeleteScrapProcessService);

    await deleteProcess.execute(id);

    return response.sendStatus(204);
  }
}
