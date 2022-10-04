const { clickProcessorService } = require('../domain/click-processor.service');
const {
  RecordedClicksFileRepository,
} = require('./recorded-clicks-file.repository');
const { FilterClicksCommand } = require('./filter-clicks.command');

jest.mock('../domain/click-processor.service');
jest.mock('./recorded-clicks-file.repository');

describe('Testing filterClicksCommand', () => {
  it.only('Should have the correct interface', async () => {
    let readClicks = jest.fn().mockImplementation(() => Promise.resolve());
    let writeClicks = jest.fn().mockImplementation(() => Promise.resolve());
    let filterClicks = jest.fn().mockImplementation(() => Promise.resolve());
    RecordedClicksFileRepository.mockImplementation(() => {
      return {
        readClicks,
        writeClicks,
      };
    });
    clickProcessorService.mockImplementation(() => ({
      filterClicks,
    }));
    await FilterClicksCommand();
    expect(readClicks).toHaveBeenCalledTimes(1);
    expect(writeClicks).toHaveBeenCalledTimes(1);
    expect(filterClicks).toHaveBeenCalledTimes(1);
  });

  it.only('When error writting..', async () => {
    let readClicks = jest.fn().mockImplementation(() => Promise.resolve());
    let writeClicks = jest.fn().mockImplementation(() => Promise.reject());
    let filterClicks = jest.fn().mockImplementation(() => Promise.resolve());
    RecordedClicksFileRepository.mockImplementation(() => {
      return {
        readClicks,
        writeClicks,
      };
    });
    clickProcessorService.mockImplementation(() => ({
      filterClicks,
    }));

    try {
      await FilterClicksCommand();
    } catch (e) {
      expect(readClicks).toHaveBeenCalledTimes(1);
      expect(writeClicks).toHaveBeenCalledTimes(1);
      expect(filterClicks).toHaveBeenCalledTimes(1);
    }
  });
});
