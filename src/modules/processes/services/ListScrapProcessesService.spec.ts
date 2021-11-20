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
      category: 'search_leads',
    });

    const process2 = await fakeScrapProcessesRepository.create({
      startDot: '201',
      endDot: '300',
      status: 'Running',
      category: 'search_leads',
    });

    const process3 = await fakeScrapProcessesRepository.create({
      startDot: '0',
      endDot: '100',
      status: 'Failed',
      category: 'search_leads',
    });

    const process4 = await fakeScrapProcessesRepository.create({
      startDot: '100',
      endDot: '200',
      status: 'Completed',
      category: 'search_leads',
    });

    const processes = await listScrapProcesses.execute({
      category: 'search_leads',
    });

    expect(processes).toEqual(
      expect.arrayContaining([process1, process2, process3, process4]),
    );
  });

  it('should be able to list a single process by id', async () => {
    const process = await fakeScrapProcessesRepository.create({
      startDot: '301',
      endDot: '400',
      status: 'Created',
      category: 'search_leads',
    });

    const processFound = await listScrapProcesses.execute({ id: process.id });

    expect(processFound).toEqual(process);
  });

  it('should not be able to list a non-existing process', async () => {
    await expect(
      listScrapProcesses.execute({ id: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to list with id and category as undefined', async () => {
    await expect(listScrapProcesses.execute({})).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
