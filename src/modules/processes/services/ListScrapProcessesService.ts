import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ScrapProcess from '../infra/typeorm/entities/ScrapProcess';
import IScrapProcessesRepository from '../repositories/IScrapProcessesRepository';

@injectable()
export default class ListScrapProcessesService {
  constructor(
    @inject('ScrapProcessesRepository')
    private scrapProcessesRepository: IScrapProcessesRepository,
  ) {}

  public async execute(id?: string): Promise<ScrapProcess | ScrapProcess[]> {
    if (id) {
      const process = await this.scrapProcessesRepository.findById(id);

      if (!process) {
        throw new AppError('There is no process with given ID.');
      }

      return process;
    }
    const processes = await this.scrapProcessesRepository.findAll();

    return processes;
  }
}
