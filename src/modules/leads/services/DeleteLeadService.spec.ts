import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import DeleteLeadService from './DeleteLeadService';

import FakeLeadsRepository from '../repositories/fakes/FakeLeadsRepository';

let fakeLeadsRepository: FakeLeadsRepository;
let deleteLead: DeleteLeadService;

describe('DeleteLead', () => {
  beforeEach(() => {
    fakeLeadsRepository = new FakeLeadsRepository();

    deleteLead = new DeleteLeadService(fakeLeadsRepository);
  });

  it('should be able to delete a lead', async () => {
    const lead = await fakeLeadsRepository.create({
      usdot: '1234567',
      fullName: 'John Doe',
    });

    await expect(deleteLead.execute(lead.id)).resolves;
  });

  it('should not be able to delete a lead with a wrong id', async () => {
    await expect(deleteLead.execute('non-existing-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
