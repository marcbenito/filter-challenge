const parseDate = require('./dates');

describe('Testing getDate', () => {
  describe('With valid timestamp ', () => {
    it('when 3/11/2020 07:02:54', () => {
      let startTime = performance.now();
      let response;
      for (let i = 0; i < 1000000; i++) {
        response = parseDate('3/11/2020 07:02:54');
      }
      expect(response.date).toEqual(new Date(2020, 10, 3, 7, 2, 54));
      expect(response.periodMin).toEqual('3/11/2020 07');
      let endTime = performance.now();

      console.log(
        `Call to doSomething took ${endTime - startTime} milliseconds`
      );
    });
    it('when 23/11/2020 07:02:54', () => {
      let response = parseDate('23/11/2020 07:02:54');
      expect(response.date).toEqual(new Date(2020, 10, 23, 7, 2, 54));
      expect(response.periodMin).toEqual('23/11/2020 07');
    });
    it('when 23/01/2020 07:02:54', () => {
      let response = parseDate('23/01/2020 07:02:54');
      expect(response.date).toEqual(new Date(2020, 0, 23, 7, 2, 54));
      expect(response.periodMin).toEqual('23/01/2020 07');
    });
    it('when 23/01/2020 23:59:59', () => {
      let response = parseDate('23/01/2020 23:59:59');
      expect(response.date).toEqual(new Date(2020, 0, 23, 23, 59, 59));
      expect(response.periodMin).toEqual('23/01/2020 23');
    });
  });

  describe('With invalid timestamp ', () => {
    it('when year missing is big 23/01/202 23:59:59', () => {
      let response = parseDate('23/01/202 23:59:59');
      expect(response).toBeNull();
    });
  });
});
