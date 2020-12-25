import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ILeadsRepository from '../repositories/ILeadsRepository';

@injectable()
export default class DeleteLeadService {
  constructor(
    @inject('LeadsRepository')
    private leadsRepository: ILeadsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const lead = await this.leadsRepository.findById(id);

    if (!lead) {
      throw new AppError('No lead was found with given ID.');
    }

    await this.leadsRepository.delete(lead);
  }
}
