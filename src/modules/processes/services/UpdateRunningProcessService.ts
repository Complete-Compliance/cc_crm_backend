import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IScrapProcessesRepository from '../repositories/IScrapProcessesRepository';

@injectable()
export default class UpdateRunningProcessService {
  constructor(
    @inject('ScrapProcessesRepository')
    private scrapProcessesRepository: IScrapProcessesRepository,
  ) {}

  public async execute(): Promise<void> {
    const runningProcessExists = await this.scrapProcessesRepository.findByStatus(
      'Running',
    );

    if (!runningProcessExists) {
      throw new AppError('There are no Running Process.');
    }

    runningProcessExists.status = 'Completed';

    await this.scrapProcessesRepository.update(runningProcessExists);
  }
}
