import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ScrapProcess from '../infra/typeorm/entities/ScrapProcess';
import IScrapProcessesRepository from '../repositories/IScrapProcessesRepository';

interface IRequest {
  startDot: string;
  endDot: string;
  category: string;
}

@injectable()
export default class CreateScrapProcessService {
  constructor(
    @inject('ScrapProcessesRepository')
    private scrapProcessesRepository: IScrapProcessesRepository,
  ) {}

  public async execute({
    startDot,
    endDot,
    category,
  }: IRequest): Promise<ScrapProcess> {
    if (Number(startDot) > Number(endDot)) {
      throw new AppError('StartDot should be lower than EndDot');
    }

    const process = await this.scrapProcessesRepository.create({
      startDot,
      endDot,
      status: 'Created',
      category,
    });

    return process;
  }
}
