import { getRepository, Repository } from 'typeorm';

import ILeadsRepository from '@modules/leads/repositories/ILeadsRepository';
import ICreateLeadDTO from '@modules/leads/dtos/ICreateLeadDTO';

import Lead from '../entities/Lead';

export default class LeadsRepository implements ILeadsRepository {
  private ormRepository: Repository<Lead>;

  constructor() {
    this.ormRepository = getRepository(Lead);
  }

  public async findById(id: string): Promise<Lead | undefined> {
    const lead = await this.ormRepository.findOne(id);

    return lead;
  }

  public async findByDOT(dot: string): Promise<Lead | undefined> {
    const lead = await this.ormRepository.findOne({ where: { usdot: dot } });

    return lead;
  }

  public async findHighestDOT(): Promise<number | undefined> {
    const highestDOT = await this.ormRepository.query(
      'SELECT MAX(CAST(usdot AS INT)) FROM leads',
    );

    return highestDOT;
  }

  public async create(leadData: ICreateLeadDTO): Promise<Lead> {
    const lead = this.ormRepository.create(leadData);

    await this.ormRepository.save(lead);

    return lead;
  }

  public async save(lead: Lead): Promise<Lead> {
    return this.ormRepository.save(lead);
  }

  public async delete(lead: Lead): Promise<void> {
    await this.ormRepository.remove(lead);
  }

  public async findAll(skip: number): Promise<Lead[]> {
    const leads = await this.ormRepository.find({
      order: { usdot: 'DESC' },
      skip,
      take: 50,
    });

    return leads;
  }
}
