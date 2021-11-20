import ICreateScrapProcessDTO from '@modules/processes/dtos/ICreateScrapProcessDTO';
import IFindByStatusDTO from '../dtos/IFindByStatusDTO';

import ScrapProcess from '../infra/typeorm/entities/ScrapProcess';

export default interface IScrapProcessesRepository {
  create(data: ICreateScrapProcessDTO): Promise<ScrapProcess>;
  update(scrapProcess: ScrapProcess): Promise<ScrapProcess>;
  delete(scrapProcess: ScrapProcess): Promise<void>;
  findByStatus(searchData: IFindByStatusDTO): Promise<ScrapProcess | undefined>;
  findById(id: string): Promise<ScrapProcess | undefined>;
  findAll(category: string): Promise<ScrapProcess[]>;
}
