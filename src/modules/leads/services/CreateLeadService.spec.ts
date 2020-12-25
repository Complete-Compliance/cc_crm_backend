import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import CreateLeadService from './CreateLeadService';

import FakeLeadsRepository from '../repositories/fakes/FakeLeadsRepository';

let fakeLeadsRepository: FakeLeadsRepository;
let createLead: CreateLeadService;

describe('CreateLead', () => {
  beforeEach(() => {
    fakeLeadsRepository = new FakeLeadsRepository();

    createLead = new CreateLeadService(fakeLeadsRepository);
  });

  it('should be able to create a new lead', async () => {
    const lead = await createLead.execute({
      usdot: '1234567',
      fullName: 'John Doe',
    });

    expect(lead).toHaveProperty('id');
  });

  it('should not be able to create a new lead without usdot', async () => {
    await expect(
      createLead.execute({
        usdot: '',
        fullName: 'John Doe',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new lead with the same dot', async () => {
    await createLead.execute({
      usdot: '1234567',
      fullName: 'John Doe',
    });

    await expect(
      createLead.execute({
        usdot: '1234567',
        fullName: 'John Doe 2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
