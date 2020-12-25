import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import UpdateLeadService from './UpdateLeadService';

import FakeLeadsRepository from '../repositories/fakes/FakeLeadsRepository';

let fakeLeadsRepository: FakeLeadsRepository;
let updateLead: UpdateLeadService;

describe('UpdateLead', () => {
  beforeEach(() => {
    fakeLeadsRepository = new FakeLeadsRepository();

    updateLead = new UpdateLeadService(fakeLeadsRepository);
  });

  it('should be able to update a lead', async () => {
    const lead = await fakeLeadsRepository.create({
      usdot: '1234567',
      fullName: 'John Doe',
    });

    const updatedLead = await updateLead.execute({
      id: lead.id,
      usdot: '7654321',
    });

    const findUpdatedLead = await fakeLeadsRepository.findById(updatedLead.id);

    expect(updatedLead).toEqual(findUpdatedLead);
    expect(findUpdatedLead?.usdot).toBe('7654321');
  });

  it('should be able to update a lead without changing dot information', async () => {
    const lead = await fakeLeadsRepository.create({
      usdot: '1234567',
      fullName: 'John Doe',
    });

    const updatedLead = await updateLead.execute({
      id: lead.id,
      fullName: 'Gisre Gone',
    });

    const findUpdatedLead = await fakeLeadsRepository.findById(updatedLead.id);

    expect(updatedLead).toEqual(findUpdatedLead);
    expect(findUpdatedLead?.fullName).toBe('Gisre Gone');
  });

  it('should not be able to update a unexisting lead', async () => {
    await expect(
      updateLead.execute({
        id: 'non-existing-id',
        usdot: '1231313',
        fullName: 'John Doe',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a lead usdot into an usdot from another lead', async () => {
    await fakeLeadsRepository.create({
      usdot: '1234567',
      fullName: 'John Doe',
    });

    const lead = await fakeLeadsRepository.create({
      usdot: '12345678',
      fullName: 'John Doe 2',
    });

    await expect(
      updateLead.execute({
        id: lead.id,
        usdot: '1234567',
        fullName: 'Doe John',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
