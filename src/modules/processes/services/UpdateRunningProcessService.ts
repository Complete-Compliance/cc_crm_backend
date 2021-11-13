import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IScrapProcessesRepository from '../repositories/IScrapProcessesRepository';

interface IRequest {
  category: string;
}

@injectable()
export default class UpdateRunningProcessService {
  constructor(
    @inject('ScrapProcessesRepository')
    private scrapProcessesRepository: IScrapProcessesRepository,
  ) {}

  public async execute({ category }: IRequest): Promise<void> {
    const runningProcessExists = await this.scrapProcessesRepository.findByStatus(
      { status: 'Running', category },
    );

    if (!runningProcessExists) {
      throw new AppError('There are no Running Process.');
    }

    runningProcessExists.status = 'Completed';

    await this.scrapProcessesRepository.update(runningProcessExists);
  }
}
