import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FindLeadByDotService from './FindLeadByDotService';

import FakeLeadsRepository from '../repositories/fakes/FakeLeadsRepository';
import Lead from '../infra/typeorm/entities/Lead';

let fakeLeadsRepository: FakeLeadsRepository;
let findLead: FindLeadByDotService;

describe('FindLeadByDot', () => {
  beforeEach(() => {
    fakeLeadsRepository = new FakeLeadsRepository();

    findLead = new FindLeadByDotService(fakeLeadsRepository);
  });

  it('should be able to find a lead by a dot', async () => {
    const lead = await fakeLeadsRepository.create({
      usdot: '1234567',
      fullName: 'John Doe',
    });

    const foundLead = (await findLead.execute({
      dot: '1234567',
      searchCriteria: 'exact',
      page: '1',
    })) as Lead[];

    expect(foundLead[0].id).toEqual(lead.id);
  });

  it('should be able to find all leads that match the "dot" pattern passed', async () => {
    const lead1 = await fakeLeadsRepository.create({
      usdot: '1234567',
      fullName: 'John Doe',
    });

    const lead2 = await fakeLeadsRepository.create({
      usdot: '123',
      fullName: 'John Doe',
    });

    const lead3 = await fakeLeadsRepository.create({
      usdot: '12345677899',
      fullName: 'John Doe',
    });

    await fakeLeadsRepository.create({
      usdot: '9090909090',
      fullName: 'John Doe',
    });

    const foundLeads = (await findLead.execute({
      dot: '123',
      searchCriteria: 'contains',
      page: '1',
    })) as Lead[];

    expect(foundLeads).toEqual(expect.arrayContaining([lead1, lead2, lead3]));
  });

  it('should be able to return undefined when a lead is not found with an exact search', async () => {
    const foundLead = await findLead.execute({
      dot: '1234567',
      searchCriteria: 'exact',
      page: '1',
    });

    expect(foundLead).toBe(undefined);
  });

  it('should not be able search with an unknown searchCriteria', async () => {
    await expect(
      findLead.execute({
        dot: '1234567',
        searchCriteria: 'all',
        page: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
