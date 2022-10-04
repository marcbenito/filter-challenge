const ClicksByIp = require('./clicks-by-ip');
const { clickProcessorService } = require('./click-processor.service');
jest.mock('./clicks-by-ip');

describe.only('Testing getDate', () => {
  let addClick = jest.fn();
  beforeAll(() => {
    ClicksByIp.mockImplementation(() => {
      return {
        addClick,
        totalClicks: 1,
        periods: {
          'fake-ts': { ip: 'fake-value', timestamp: 'fake-ts', amount: 15.75 },
        },
      };
    });
  });
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    ClicksByIp.mockClear();
    addClick.mockClear();
  });

  describe('Basic testing for one Item', () => {
    it.only('One item correct', () => {
      clickProcessorService().filterClicks([
        { ip: 'fake-value', timestamp: 'fake-ts', amount: 15.75 },
      ]);
      expect(ClicksByIp).toHaveBeenCalledTimes(1);
      expect(addClick).toHaveBeenCalledTimes(1);
    });
  });
});
