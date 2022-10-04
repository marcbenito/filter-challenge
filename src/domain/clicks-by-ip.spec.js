const ClicksByIp = require('./clicks-by-ip');

describe('Testing getDate', () => {
  let element;

  beforeEach(() => {
    element = new ClicksByIp();
  });

  describe('Basic testing for one Item', () => {
    it.only('One item correct', () => {
      element.addClick({
        ip: 'fake-value',
        timestamp: '3/11/2020 07:02:00',
        amount: 15.75,
      });
      expect(Object.keys(element.periods)).toEqual(['3/11/2020 07']);
      expect(element.periods['3/11/2020 07'].amount).toEqual(15.75);
      expect(element.periods['3/11/2020 07'].ip).toEqual('fake-value');
      expect(element.periods['3/11/2020 07'].timestamp).toEqual(
        '3/11/2020 07:02:00'
      );
    });
    it.only('invalid item', () => {
      element.addClick({
        ip: 'fake-value',
        timestamp: '3/11/2 07:02:00',
        amount: 15.75,
      });
      expect(Object.keys(element.periods).length).toEqual(0);
      expect(element.totalClicks).toEqual(0);
    });
  });
  describe('2 Items in same period', () => {
    it.only('2 clicks with same amount', () => {
      element.addClick({
        ip: 'fake-value',
        timestamp: '3/11/2020 07:02:00',
        amount: 15.75,
      });
      element.addClick({
        ip: 'fake-value',
        timestamp: '3/11/2020 07:04:00',
        amount: 15.75,
      });
      expect(Object.keys(element.periods)).toEqual(['3/11/2020 07']);
      expect(element.periods['3/11/2020 07'].amount).toEqual(15.75);
    });
    it.only('2 clicks with same amount 2nd date smaller', () => {
      element.addClick({
        ip: 'fake-value',
        timestamp: '3/11/2020 07:02:00',
        amount: 15.75,
      });
      element.addClick({
        ip: 'fake-value',
        timestamp: '3/11/2020 07:01:00',
        amount: 15.75,
      });
      expect(Object.keys(element.periods)).toEqual(['3/11/2020 07']);
      expect(element.periods['3/11/2020 07'].amount).toEqual(15.75);
    });

    it.only('2 clicks first with big amount', () => {
      element.addClick({
        ip: 'fake-value',
        timestamp: '3/11/2020 07:02:00',
        amount: 20,
      });
      element.addClick({
        ip: 'fake-value',
        timestamp: '3/11/2020 07:04:00',
        amount: 15.75,
      });

      expect(element.periods['3/11/2020 07'].amount).toEqual(20);
      expect(element.periods['3/11/2020 07'].timestamp).toEqual(
        '3/11/2020 07:02:00'
      );
    });
    it.only('2 clicks second with big amount', () => {
      element.addClick({
        ip: 'fake-value',
        timestamp: '3/11/2020 07:02:00',
        amount: 20,
      });
      element.addClick({
        ip: 'fake-value',
        timestamp: '3/11/2020 07:04:00',
        amount: 30,
      });

      expect(element.periods['3/11/2020 07'].amount).toEqual(30);
      expect(element.periods['3/11/2020 07'].timestamp).toEqual(
        '3/11/2020 07:04:00'
      );
    });
  });
  it.only('11 clicks', () => {
    for (let i = 0; i < 12; i++) {
      element.addClick({
        ip: 'fake-value',
        timestamp: `${i}/11/2020 07:02:00`,
        amount: 20,
      });
    }
    expect(Object.keys(element.periods).length).toEqual(0);
    expect(element.totalClicks).toEqual(11);
  });
});
