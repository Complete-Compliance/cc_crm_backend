import { inject, injectable } from 'tsyringe';
import Lead from '../infra/typeorm/entities/Lead';
import ILeadsRepository from '../repositories/ILeadsRepository';

@injectable()
export default class FindLeadByDotService {
  constructor(
    @inject('LeadsRepository')
    private leadsRepository: ILeadsRepository,
  ) {}

  public async execute(dot: string): Promise<Lead | undefined> {
    const lead = await this.leadsRepository.findByDOT(dot);

    return lead;
  }
}
