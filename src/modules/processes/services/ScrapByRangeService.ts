import AppError from '@shared/errors/AppError';
import resolveScriptPathByCategory from '@shared/utils/resolveScriptPathByCategory';
import { spawn } from 'child_process';
import { inject, injectable } from 'tsyringe';
import IScrapProcessesRepository from '../repositories/IScrapProcessesRepository';

interface IRequest {
  id: string;
  category: string;
}

@injectable()
export default class ScrapByRangeService {
  constructor(
    @inject('ScrapProcessesRepository')
    private scrapProcessesRepository: IScrapProcessesRepository,
  ) {}

  public async execute({ id, category }: IRequest): Promise<void> {
    const runningProcessExists = await this.scrapProcessesRepository.findByStatus(
      { status: 'Running', category },
    );

    if (runningProcessExists) {
      throw new AppError(
        "Can't execute more than ONE scrap process at the same time.",
      );
    }

    const processToRun = await this.scrapProcessesRepository.findById(id);

    if (!processToRun) {
      throw new AppError('No process was found with given ID.');
    }

    const scriptPath = resolveScriptPathByCategory(category);

    spawn(`${process.env.PYTHON_EXEC_PATH} ${scriptPath} $START $END`, {
      shell: true,
      detached: true,
      env: {
        START: processToRun.startDot,
        END: processToRun.endDot,
      },
    }).on('error', async () => {
      processToRun.status = 'Failed';
      await this.scrapProcessesRepository.update(processToRun);
    });

    processToRun.status = 'Running';
    await this.scrapProcessesRepository.update(processToRun);
  }
}
