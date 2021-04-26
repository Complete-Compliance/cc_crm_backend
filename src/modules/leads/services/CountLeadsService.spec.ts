import 'reflect-metadata';

import CountLeadsService from './CountLeadsService';

import FakeLeadsRepository from '../repositories/fakes/FakeLeadsRepository';

let fakeLeadsRepository: FakeLeadsRepository;
let countLeads: CountLeadsService;

describe('CountLeads', () => {
  beforeEach(() => {
    fakeLeadsRepository = new FakeLeadsRepository();

    countLeads = new CountLeadsService(fakeLeadsRepository);
  });

  it('should be able count all leads', async () => {
    await fakeLeadsRepository.create({
      usdot: '1234567',
      fullName: 'John Doe',
    });

    await fakeLeadsRepository.create({
      usdot: '12345673',
      fullName: 'John Doe',
    });

    await fakeLeadsRepository.create({
      usdot: '12345674',
      fullName: 'John Doe',
    });

    const leadsQtd = await countLeads.execute();

    expect(leadsQtd).toBe(3);
  });
});
