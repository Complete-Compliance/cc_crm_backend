import { inject, injectable } from 'tsyringe';
import ILeadsRepository from '../repositories/ILeadsRepository';

@injectable()
export default class CountLeadsService {
  constructor(
    @inject('LeadsRepository')
    private leadsRepository: ILeadsRepository,
  ) {}

  public async execute(): Promise<number> {
    const leadsQtd = await this.leadsRepository.countLeads();

    return leadsQtd;
  }
}
