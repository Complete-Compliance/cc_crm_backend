import ICreateScrapProcessDTO from '@modules/processes/dtos/ICreateScrapProcessDTO';
import IScrapProcessesRepository from '@modules/processes/repositories/IScrapProcessesRepository';
import { getRepository, Repository } from 'typeorm';
import ScrapProcess from '../entities/ScrapProcess';

export default class ScrapProcessesRepository
  implements IScrapProcessesRepository {
  private ormRepository: Repository<ScrapProcess>;

  constructor() {
    this.ormRepository = getRepository(ScrapProcess);
  }

  public async create(data: ICreateScrapProcessDTO): Promise<ScrapProcess> {
    const process = this.ormRepository.create(data);

    await this.ormRepository.save(process);

    return process;
  }

  public async update(scrapProcess: ScrapProcess): Promise<ScrapProcess> {
    await this.ormRepository.save(scrapProcess);

    return scrapProcess;
  }

  public async delete(scrapProcess: ScrapProcess): Promise<void> {
    await this.ormRepository.remove(scrapProcess);
  }

  public async findByStatus(status: string): Promise<ScrapProcess | undefined> {
    const process = await this.ormRepository.findOne({ where: { status } });

    return process;
  }

  public async findById(id: string): Promise<ScrapProcess | undefined> {
    const process = await this.ormRepository.findOne(id);

    return process;
  }

  public async findAll(): Promise<ScrapProcess[]> {
    const processes = await this.ormRepository.find();

    return processes;
  }
}
