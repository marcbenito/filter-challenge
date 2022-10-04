const ClicksByIp = require('./clicks-by-ip');

function clickProcessorService() {
  return {
    filterClicks: function (clickData) {
      this.data = clickData;
      console.log('ClickProcess Service START');

      let clicksStructure = {};
      let startTime = performance.now();

      for (const click of clickData) {
        if (!clicksStructure[click.ip]) {
          clicksStructure[click.ip] = new ClicksByIp();
        }

        clicksStructure[click.ip].addClick(click);
      }
      let result = [];
      for (const clickByIpElem of Object.values(clicksStructure)) {
        if (clickByIpElem.totalClicks <= 10) {
          for (const click of Object.values(clickByIpElem.periods)) {
            result.push(click);
          }
        }
      }

      let endTime = performance.now();

      console.log(
        `Call to doSomething took ${endTime - startTime} milliseconds`
      );
      return result;
    },
  };
}

module.exports = { clickProcessorService };
