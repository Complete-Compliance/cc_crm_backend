import AppError from '@shared/errors/AppError';
import FakeScrapProcessRepository from '../repositories/fakes/FakeScrapProcessRepository';
import ListScrapProcessesService from './ListScrapProcessesService';

let fakeScrapProcessesRepository: FakeScrapProcessRepository;
let listScrapProcesses: ListScrapProcessesService;

describe('ListScrapProcesses', () => {
  beforeEach(() => {
    fakeScrapProcessesRepository = new FakeScrapProcessRepository();

    listScrapProcesses = new ListScrapProcessesService(
      fakeScrapProcessesRepository,
    );
  });

  it('should be able to list all scrap processes', async () => {
    const process1 = await fakeScrapProcessesRepository.create({
      startDot: '301',
      endDot: '400',
      status: 'Created',
    });

    const process2 = await fakeScrapProcessesRepository.create({
      startDot: '201',
      endDot: '300',
      status: 'Running',
    });

    const process3 = await fakeScrapProcessesRepository.create({
      startDot: '0',
      endDot: '100',
      status: 'Failed',
    });

    const process4 = await fakeScrapProcessesRepository.create({
      startDot: '100',
      endDot: '200',
      status: 'Completed',
    });

    const processes = await listScrapProcesses.execute();

    expect(processes).toEqual(
      expect.arrayContaining([process1, process2, process3, process4]),
    );
  });

  it('should be able to list a single process by id', async () => {
    const process = await fakeScrapProcessesRepository.create({
      startDot: '301',
      endDot: '400',
      status: 'Created',
    });

    const processFound = await listScrapProcesses.execute(process.id);

    expect(processFound).toEqual(process);
  });

  it('should not be able to list a non-existing process', async () => {
    await expect(
      listScrapProcesses.execute('non-existing-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
