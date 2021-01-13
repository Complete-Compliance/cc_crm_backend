import { inject, injectable } from 'tsyringe';
import ILeadsRepository from '../repositories/ILeadsRepository';

@injectable()
export default class GetHighestDOTLeadService {
  constructor(
    @inject('LeadsRepository')
    private leadsRepository: ILeadsRepository,
  ) {}

  public async execute(): Promise<number | undefined> {
    const dot = await this.leadsRepository.findHighestDOT();

    return dot;
  }
}
