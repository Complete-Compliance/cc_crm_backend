import AppError from '@shared/errors/AppError';
import FakeScrapProcessRepository from '../repositories/fakes/FakeScrapProcessRepository';
import CreateScrapProcessService from './CreateScrapProcessService';

let fakeScrapProcessesRepository: FakeScrapProcessRepository;
let createScrapProcess: CreateScrapProcessService;

describe('CreateScrapProcess', () => {
  beforeEach(() => {
    fakeScrapProcessesRepository = new FakeScrapProcessRepository();

    createScrapProcess = new CreateScrapProcessService(
      fakeScrapProcessesRepository,
    );
  });

  it('should be able to create a new scrap process', async () => {
    const process = await createScrapProcess.execute({
      startDot: '300',
      endDot: '400',
    });

    expect(process).toHaveProperty('id');
    expect(process.status).toBe('Created');
  });

  it('should not be able to create a scrap process when the startDot is higher than the endDot', async () => {
    await expect(
      createScrapProcess.execute({
        startDot: '400',
        endDot: '300',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
