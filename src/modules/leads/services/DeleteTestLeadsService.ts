import { inject, injectable } from 'tsyringe';
import ILeadsRepository from '../repositories/ILeadsRepository';

@injectable()
export default class DeleteTestLeadsService {
  constructor(
    @inject('LeadsRepository')
    private leadsRepository: ILeadsRepository,
  ) {}

  public async execute(): Promise<void> {
    const leads = await this.leadsRepository.findAll();

    leads.forEach(async lead => {
      if (lead.entityType === 'Mortal') {
        await this.leadsRepository.delete(lead);
      }
    });
  }
}
