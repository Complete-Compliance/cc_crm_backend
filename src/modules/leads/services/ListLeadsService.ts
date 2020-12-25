import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Lead from '../infra/typeorm/entities/Lead';
import ILeadsRepository from '../repositories/ILeadsRepository';

@injectable()
export default class ListLeadsService {
  constructor(
    @inject('LeadsRepository')
    private leadsRepository: ILeadsRepository,
  ) {}

  public async execute(id?: string): Promise<Lead | Lead[]> {
    if (id) {
      const lead = await this.leadsRepository.findById(id);

      if (!lead) {
        throw new AppError('No lead found with the given ID', 404);
      }

      return lead;
    }

    const leads = await this.leadsRepository.findAll();

    if (!leads.length) {
      throw new AppError('No leads found', 404);
    }

    return leads;
  }
}
