import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Lead from '../infra/typeorm/entities/Lead';
import ILeadsRepository from '../repositories/ILeadsRepository';

interface IRequest {
  id?: string;
  page?: string;
  searchCriteria?: string;
}

@injectable()
export default class ListLeadsService {
  constructor(
    @inject('LeadsRepository')
    private leadsRepository: ILeadsRepository,
  ) {}

  public async execute({
    id,
    page,
    searchCriteria,
  }: IRequest): Promise<Lead | Lead[]> {
    if (id) {
      const lead = await this.leadsRepository.findById(id);

      if (!lead) {
        throw new AppError('No lead found with the given ID', 404);
      }

      return lead;
    }

    if (!id && !page) {
      throw new AppError('Page must be present when ID is not');
    }

    const skip = (Number(page) - 1) * 50;

    let leads: Lead[];
    switch (searchCriteria) {
      case 'email': {
        leads = await this.leadsRepository.findAllWithEmail(skip);
        break;
      }
      default: {
        leads = await this.leadsRepository.findAll(skip);

        if (!leads.length) {
          throw new AppError('No leads found', 404);
        }
      }
    }

    return leads;
  }
}
