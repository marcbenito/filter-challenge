const { clickProcessorService } = require('../domain/click-processor.service');
const {
  RecordedClicksFileRepository,
} = require('./recorded-clicks-file.repository');

const FilterClicksCommand = async function () {
  const fileIn = './input-clicks.json';
  const fileOut = './resultset.json';

  //initialize the repository and service depeneencies
  let fileRepository = new RecordedClicksFileRepository();
  let svc = clickProcessorService();

  //Application use case: Read, process, write..

  let data = await fileRepository.readClicks(fileIn);
  let response = svc.filterClicks(data);
  await fileRepository.writeClicks(fileOut, response);
};

module.exports = { FilterClicksCommand };
