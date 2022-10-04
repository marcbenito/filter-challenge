const {
  RecordedClicksFileRepository,
} = require('./recorded-clicks-file.repository');
const fs = require('fs');

describe(' read file', () => {
  let clickExample = {
    ip: '33.33.33.33',
    timestamp: '3/11/2020 07:02:54',
    amount: 15.75,
  };
  jest
    .spyOn(fs, 'readFile')
    .mockImplementation((a, b, callback) =>
      callback(
        null,
        '[{"amount": 15.75, "ip": "33.33.33.33", "timestamp": "3/11/2020 07:02:54"}]'
      )
    );
  const writeMock = jest
    .spyOn(fs, 'writeFile')
    .mockImplementation((a, b, c, callback) => callback(null, null));

  it('read file', async () => {
    const element = new RecordedClicksFileRepository();
    const result = await element.readClicks('fake-value');
    expect(result).toEqual([clickExample]);
  });

  it('write file', async () => {
    const element = new RecordedClicksFileRepository();
    await element.writeClicks('fake-value', [clickExample]);
    expect(writeMock).toHaveBeenCalledWith(
      'fake-value',
      JSON.stringify([clickExample]),
      'utf8',
      expect.any(Function)
    );
  });
  it('write file error', async () => {
    jest
      .spyOn(fs, 'writeFile')
      .mockImplementation((a, b, c, callback) => callback('ERROR', null));

    const element = new RecordedClicksFileRepository();
    let errorTrhown = false;
    try {
      await element.writeClicks('fake-value', [clickExample]);
    } catch (e) {
      errorTrhown = true;
    }
    expect(errorTrhown).toEqual(true);
  });
  it('read file error', async () => {
    jest
      .spyOn(fs, 'readFile')
      .mockImplementation((a, b, callback) => callback('ERROR!', ''));

    const element = new RecordedClicksFileRepository();
    let errorTrhown = false;
    try {
      await element.readClicks('fake-value');
    } catch (e) {
      errorTrhown = true;
    }
    expect(errorTrhown).toEqual(true);
  });
});
