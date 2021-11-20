import AppError from '@shared/errors/AppError';
import FakeScrapProcessRepository from '../repositories/fakes/FakeScrapProcessRepository';
import UpdateRunningProcessService from './UpdateRunningProcessService';

let fakeScrapProcessesRepository: FakeScrapProcessRepository;
let updateRunningProcess: UpdateRunningProcessService;

describe('UpdateRunningProcess', () => {
  beforeEach(() => {
    fakeScrapProcessesRepository = new FakeScrapProcessRepository();

    updateRunningProcess = new UpdateRunningProcessService(
      fakeScrapProcessesRepository,
    );
  });

  it('should be able to update a running process', async () => {
    const process = await fakeScrapProcessesRepository.create({
      startDot: '100',
      endDot: '200',
      status: 'Running',
      category: 'search_leads',
    });

    await expect(updateRunningProcess.execute({ category: 'search_leads' }))
      .resolves;

    const completedProcess = await fakeScrapProcessesRepository.findByStatus({
      status: 'Completed',
      category: 'search_leads',
    });

    expect(completedProcess?.id).toBe(process.id);
  });

  it('should not be able to update a running processes when there is no running process', async () => {
    await expect(
      updateRunningProcess.execute({ category: 'search_leads' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
