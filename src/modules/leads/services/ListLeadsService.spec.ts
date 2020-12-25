import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import ListLeadsService from './ListLeadsService';

import FakeLeadsRepository from '../repositories/fakes/FakeLeadsRepository';

let fakeLeadsRepository: FakeLeadsRepository;
let listLeads: ListLeadsService;

describe('ListLeads', () => {
  beforeEach(() => {
    fakeLeadsRepository = new FakeLeadsRepository();

    listLeads = new ListLeadsService(fakeLeadsRepository);
  });

  it('should be able to list a single lead when id is given', async () => {
    const lead = await fakeLeadsRepository.create({
      usdot: '1234567',
      fullName: 'John Doe',
    });

    const foundLead = await listLeads.execute(lead.id);

    expect(foundLead).toEqual(lead);
  });

  it('should be able to list all leads', async () => {
    const lead1 = await fakeLeadsRepository.create({
      usdot: '1234567',
      fullName: 'John Doe',
    });

    const lead2 = await fakeLeadsRepository.create({
      usdot: '7654321',
      fullName: 'John Doe 2',
    });

    const leads = await listLeads.execute();

    expect(leads).toEqual(expect.arrayContaining([lead1, lead2]));
  });

  it('should not be able to list a unexisting lead when wrong id is given', async () => {
    await expect(listLeads.execute('non-existing-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not be able to list all leads when none exists', async () => {
    await expect(listLeads.execute()).rejects.toBeInstanceOf(AppError);
  });
});
