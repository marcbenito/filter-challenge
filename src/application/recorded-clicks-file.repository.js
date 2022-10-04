const { RecordedClicksRepository } = require('./recorded-clicks.repository');
const fs = require('fs');

class RecordedClicksFileRepository extends RecordedClicksRepository {
  constructor() {
    super();
  }
  async readClicks(source) {
    return new Promise((resolve, reject) => {
      fs.readFile(source, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        }
        let clicks = JSON.parse(data);
        resolve(clicks);
      });
    });
  }
  async writeClicks(destination, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(destination, JSON.stringify(data), 'utf8', (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
}

module.exports = { RecordedClicksFileRepository };
