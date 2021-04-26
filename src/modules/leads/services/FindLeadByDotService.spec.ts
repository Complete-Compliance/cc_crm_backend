import 'reflect-metadata';

import FindLeadByDotService from './FindLeadByDotService';

import FakeLeadsRepository from '../repositories/fakes/FakeLeadsRepository';

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

    const foundLead = await findLead.execute('1234567');

    expect(foundLead?.id).toEqual(lead.id);
  });

  it('should be able to return undefined when a lead is not found', async () => {
    const foundLead = await findLead.execute('1234567');

    expect(foundLead).toBe(undefined);
  });
});
