import UpdateRunningProcessService from '@modules/processes/services/UpdateRunningProcessService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UpdateRunningProcessController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const updateRunningProcess = container.resolve(UpdateRunningProcessService);

    await updateRunningProcess.execute();

    return response.sendStatus(204);
  }
}
