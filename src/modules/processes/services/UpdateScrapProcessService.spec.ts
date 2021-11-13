import AppError from '@shared/errors/AppError';
import FakeScrapProcessRepository from '../repositories/fakes/FakeScrapProcessRepository';
import UpdateScrapProcessService from './UpdateScrapProcessService';

let fakeScrapProcessesRepository: FakeScrapProcessRepository;
let updateScrapProcess: UpdateScrapProcessService;

describe('UpdateScrapProcess', () => {
  beforeEach(() => {
    fakeScrapProcessesRepository = new FakeScrapProcessRepository();

    updateScrapProcess = new UpdateScrapProcessService(
      fakeScrapProcessesRepository,
    );
  });

  it('should be able to update a scrap process', async () => {
    const process = await fakeScrapProcessesRepository.create({
      startDot: '100',
      endDot: '200',
      status: 'Created',
      category: 'search_leads',
    });

    const updatedProcess = await updateScrapProcess.execute({
      id: process.id,
      startDot: '200',
      endDot: '300',
    });

    expect(updatedProcess.id).toEqual(process.id);
    expect(updatedProcess.startDot).toBe('200');
    expect(updatedProcess.endDot).toBe('300');
    expect(updatedProcess.status).toBe('Created');
  });

  it('should be able to update only one information of a scrap process', async () => {
    const process = await fakeScrapProcessesRepository.create({
      startDot: '100',
      endDot: '200',
      status: 'Created',
      category: 'search_leads',
    });

    const updatedProcess = await updateScrapProcess.execute({
      id: process.id,
      status: 'Running',
    });

    expect(updatedProcess.id).toEqual(process.id);
    expect(updatedProcess.status).toBe('Running');
  });

  it('should not be able to update a non-existing process', async () => {
    await expect(
      updateScrapProcess.execute({
        id: 'non-existing-id',
        startDot: '400',
        endDot: '300',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a process with startDot higher than endDot', async () => {
    await expect(
      updateScrapProcess.execute({
        id: 'non-existing-id',
        startDot: '400',
        endDot: '300',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a process with startDot higher than older endDot', async () => {
    const process = await fakeScrapProcessesRepository.create({
      startDot: '100',
      endDot: '200',
      status: 'Created',
      category: 'search_leads',
    });

    await expect(
      updateScrapProcess.execute({
        id: process.id,
        startDot: '400',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a process with endDot lower than older startDot', async () => {
    const process = await fakeScrapProcessesRepository.create({
      startDot: '100',
      endDot: '200',
      status: 'Created',
      category: 'search_leads',
    });

    await expect(
      updateScrapProcess.execute({
        id: process.id,
        endDot: '50',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a process without any new values', async () => {
    const process = await fakeScrapProcessesRepository.create({
      startDot: '100',
      endDot: '200',
      status: 'Created',
      category: 'search_leads',
    });

    await expect(
      updateScrapProcess.execute({
        id: process.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a process with new startDot higher than new endDot', async () => {
    const process = await fakeScrapProcessesRepository.create({
      startDot: '100',
      endDot: '200',
      status: 'Created',
      category: 'search_leads',
    });

    await expect(
      updateScrapProcess.execute({
        id: process.id,
        startDot: '400',
        endDot: '300',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
