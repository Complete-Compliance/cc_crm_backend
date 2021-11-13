import 'dotenv/config';
import AppError from '@shared/errors/AppError';
import FakeScrapProcessRepository from '../repositories/fakes/FakeScrapProcessRepository';
import ScrapByRangeService from './ScrapByRangeService';

let fakeScrapProcessesRepository: FakeScrapProcessRepository;
let scrapByRange: ScrapByRangeService;

describe('ScrapByRange', () => {
  beforeEach(() => {
    fakeScrapProcessesRepository = new FakeScrapProcessRepository();

    scrapByRange = new ScrapByRangeService(fakeScrapProcessesRepository);
  });

  it('should be able spawn python script to scrap by range', async () => {
    const process = await fakeScrapProcessesRepository.create({
      startDot: '100',
      endDot: '200',
      status: 'Created',
      category: 'search_leads',
    });

    await expect(
      scrapByRange.execute({ id: process.id, category: 'search_leads' }),
    ).resolves;
  });

  it('should not be able spawn python scrap script with an already running process', async () => {
    await fakeScrapProcessesRepository.create({
      startDot: '100',
      endDot: '200',
      status: 'Running',
      category: 'search_leads',
    });

    const process = await fakeScrapProcessesRepository.create({
      startDot: '201',
      endDot: '300',
      status: 'Created',
      category: 'search_leads',
    });

    await expect(
      scrapByRange.execute({
        id: process.id,
        category: 'search_leads',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able spawn python scrap script with a non-existing process', async () => {
    await expect(
      scrapByRange.execute({
        id: 'non-existing-id',
        category: 'search_leads',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
