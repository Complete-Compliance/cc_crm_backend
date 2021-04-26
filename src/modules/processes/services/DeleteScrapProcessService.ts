import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IScrapProcessesRepository from '../repositories/IScrapProcessesRepository';

@injectable()
export default class DeleteUserByIdService {
  constructor(
    @inject('ScrapProcessesRepository')
    private scrapProcessesRepository: IScrapProcessesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const process = await this.scrapProcessesRepository.findById(id);

    if (!process) {
      throw new AppError('There is no scrap process with given ID.');
    }

    if (process.status === 'Running') {
      throw new AppError(
        "You can't delete a running process. Wait for it's completion",
      );
    }

    await this.scrapProcessesRepository.delete(process);
  }
}
