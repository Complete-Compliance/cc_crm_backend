import ICreateScrapProcessDTO from '@modules/processes/dtos/ICreateScrapProcessDTO';
import ScrapProcess from '../infra/typeorm/entities/ScrapProcess';

export default interface IScrapProcessesRepository {
  create(data: ICreateScrapProcessDTO): Promise<ScrapProcess>;
  update(scrapProcess: ScrapProcess): Promise<ScrapProcess>;
  findByStatus(status: string): Promise<ScrapProcess | undefined>;
  findById(id: string): Promise<ScrapProcess | undefined>;
  findAll(): Promise<ScrapProcess[]>;
}
