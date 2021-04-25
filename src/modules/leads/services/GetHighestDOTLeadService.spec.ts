import 'reflect-metadata';

import GetHighestDOTLeadService from './GetHighestDOTLeadService';

import FakeLeadsRepository from '../repositories/fakes/FakeLeadsRepository';

let fakeLeadsRepository: FakeLeadsRepository;
let getHighestDOT: GetHighestDOTLeadService;

describe('FindHighestDOTLead', () => {
  beforeEach(() => {
    fakeLeadsRepository = new FakeLeadsRepository();

    getHighestDOT = new GetHighestDOTLeadService(fakeLeadsRepository);
  });

  it('should be able to find the Higher DOT', async () => {
    await fakeLeadsRepository.create({
      usdot: '1234567',
      fullName: 'John Doe',
    });

    const expectedLead = await fakeLeadsRepository.create({
      usdot: '2234567',
      fullName: 'John Doe',
    });

    const highestDOT = await getHighestDOT.execute();

    expect(Number(highestDOT)).toEqual(Number(expectedLead.usdot));
  });
});
