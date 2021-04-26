import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ScrapProcess from '../infra/typeorm/entities/ScrapProcess';
import IScrapProcessesRepository from '../repositories/IScrapProcessesRepository';

interface IRequest {
  id: string;
  startDot?: string;
  endDot?: string;
  status?: string;
}

@injectable()
export default class UpdateScrapProcessService {
  constructor(
    @inject('ScrapProcessesRepository')
    private scrapProcessesRepository: IScrapProcessesRepository,
  ) {}

  public async execute({
    id,
    startDot,
    endDot,
    status,
  }: IRequest): Promise<ScrapProcess> {
    if (!startDot && !endDot && !status) {
      throw new AppError("Can't update a process without new values");
    }

    const process = await this.scrapProcessesRepository.findById(id);

    if (!process) {
      throw new AppError('No process exists with given ID.');
    }

    if (startDot && endDot && Number(startDot) > Number(endDot)) {
      throw new AppError("StartDot can't be higher than EndDot.");
    }

    if (startDot) {
      if (Number(startDot) > Number(process.endDot)) {
        throw new AppError("StartDot can't be higher than EndDot.");
      }

      process.startDot = startDot;
    }

    if (endDot) {
      if (Number(endDot) < Number(process.startDot)) {
        throw new AppError("EndDot can't be lower than StartDot.");
      }

      process.endDot = endDot;
    }

    if (status) {
      process.status = status;
    }

    await this.scrapProcessesRepository.update(process);

    return process;
  }
}
