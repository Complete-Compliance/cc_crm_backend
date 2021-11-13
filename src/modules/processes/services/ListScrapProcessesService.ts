import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ScrapProcess from '../infra/typeorm/entities/ScrapProcess';
import IScrapProcessesRepository from '../repositories/IScrapProcessesRepository';

interface IRequest {
  category?: string;
  id?: string;
}

@injectable()
export default class ListScrapProcessesService {
  constructor(
    @inject('ScrapProcessesRepository')
    private scrapProcessesRepository: IScrapProcessesRepository,
  ) {}

  public async execute({
    id,
    category,
  }: IRequest): Promise<ScrapProcess | ScrapProcess[]> {
    if (id) {
      const process = await this.scrapProcessesRepository.findById(id);

      if (!process) {
        throw new AppError('There is no process with given ID.');
      }

      return process;
    }

    if (!category) {
      throw new AppError('You must search by id or category');
    }

    const processes = await this.scrapProcessesRepository.findAll(category);

    return processes;
  }
}
