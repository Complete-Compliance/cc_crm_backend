import AppError from '@shared/errors/AppError';
import FakeScrapProcessRepository from '../repositories/fakes/FakeScrapProcessRepository';
import DeleteScrapProcessService from './DeleteScrapProcessService';

let fakeScrapProcessesRepository: FakeScrapProcessRepository;
let deleteScrapProcess: DeleteScrapProcessService;

describe('DeleteScrapProcess', () => {
  beforeEach(() => {
    fakeScrapProcessesRepository = new FakeScrapProcessRepository();

    deleteScrapProcess = new DeleteScrapProcessService(
      fakeScrapProcessesRepository,
    );
  });

  it('should be able to delete a scrap process', async () => {
    const process = await fakeScrapProcessesRepository.create({
      startDot: '301',
      endDot: '400',
      status: 'Created',
    });

    await expect(deleteScrapProcess.execute(process.id)).resolves;
  });

  it('should not be able to delete a non-existing scrap process', async () => {
    await expect(
      deleteScrapProcess.execute('non-existing-id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a running scrap process', async () => {
    const process = await fakeScrapProcessesRepository.create({
      startDot: '301',
      endDot: '400',
      status: 'Running',
    });

    await expect(deleteScrapProcess.execute(process.id)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
