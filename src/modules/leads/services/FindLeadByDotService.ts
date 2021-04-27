import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Lead from '../infra/typeorm/entities/Lead';
import ILeadsRepository from '../repositories/ILeadsRepository';

interface IRequest {
  dot: string;
  searchCriteria: string;
  page: string;
}

interface IResponse {
  leads: Lead[];
  leadsCount: number;
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
  }: IRequest): Promise<IResponse | undefined> {
    switch (searchCriteria) {
      case 'exact': {
        const lead = await this.leadsRepository.findByDOT(dot);

        if (!lead) {
          return undefined;
        }

        const response: IResponse = { leads: [lead], leadsCount: 1 };

        return response;
      }
      case 'contains': {
        const skip = (Number(page) - 1) * 50;
        const leads = await this.leadsRepository.findByContainingStringDOT(
          dot,
          skip,
        );

        const leadsCount = await this.leadsRepository.countByContainingStringDOT(
          dot,
        );

        const response = { leads, leadsCount };

        return response;
      }
      default: {
        throw new AppError('Unknown search criteria');
      }
    }
  }
}
