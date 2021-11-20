import { uuid } from 'uuidv4';

import ScrapProcess from '@modules/processes/infra/typeorm/entities/ScrapProcess';

import ICreateScrapProcessDTO from '@modules/processes/dtos/ICreateScrapProcessDTO';
import IFindByStatusDTO from '@modules/processes/dtos/IFindByStatusDTO';

import IScrapProcessesRepository from '../IScrapProcessesRepository';

export default class FakeScrapProcessRepository
  implements IScrapProcessesRepository {
  private processes: ScrapProcess[] = [];

  public async create(data: ICreateScrapProcessDTO): Promise<ScrapProcess> {
    const process = new ScrapProcess();

    Object.assign(
      process,
      { id: uuid(), createdAt: new Date(), updatedAt: new Date() },
      data,
    );

    this.processes.push(process);

    return process;
  }

  public async update(scrapProcess: ScrapProcess): Promise<ScrapProcess> {
    const processIndex = this.processes.findIndex(
      processToFind => processToFind.id === scrapProcess.id,
    );

    this.processes[processIndex] = scrapProcess;

    return scrapProcess;
  }

  public async delete(scrapProcess: ScrapProcess): Promise<void> {
    const processIndex = this.processes.findIndex(
      processToFind => processToFind.id === scrapProcess.id,
    );

    this.processes.splice(processIndex, 1);
  }

  public async findByStatus({
    status,
    category,
  }: IFindByStatusDTO): Promise<ScrapProcess | undefined> {
    const process = this.processes.find(
      processToFind =>
        processToFind.status === status && processToFind.category === category,
    );

    return process;
  }

  public async findById(id: string): Promise<ScrapProcess | undefined> {
    const process = this.processes.find(
      processToFind => processToFind.id === id,
    );

    return process;
  }

  public async findAll(category: string): Promise<ScrapProcess[]> {
    return this.processes.filter(process => process.category === category);
  }
}
