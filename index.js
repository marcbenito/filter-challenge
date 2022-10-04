const {
  FilterClicksCommand,
} = require('./src/application/filter-clicks.command');

console.log('Starting..');

FilterClicksCommand()
  .then(() => {
    console.log('Finished');
  })
  .catch((error) => {
    console.error(error);
  });
