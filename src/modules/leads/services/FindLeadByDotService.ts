import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Lead from '../infra/typeorm/entities/Lead';
import ILeadsRepository from '../repositories/ILeadsRepository';

interface IRequest {
  dot: string;
  searchCriteria: string;
  page: string;
}

@injectable()
export default class FindLeadByDotService {
  constructor(
    @inject('LeadsRepository')
    private leadsRepository: ILeadsRepository,
  ) {}

  public async execute({
    dot,
    searchCriteria,
    page,
  }: IRequest): Promise<Lead[] | undefined> {
    switch (searchCriteria) {
      case 'exact': {
        const lead = await this.leadsRepository.findByDOT(dot);

        if (!lead) {
          return undefined;
        }

        return [lead];
      }
      case 'contains': {
        const skip = (Number(page) - 1) * 50;
        const leads = await this.leadsRepository.findByContainingStringDOT(
          dot,
          skip,
        );

        return leads;
      }
      default: {
        throw new AppError('Unknown search criteria');
      }
    }
  }
}
