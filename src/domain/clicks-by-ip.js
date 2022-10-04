const parseDate = require('./utils/dates');

class ClicksByIp {
  constructor() {
    {
      this.periods = {};
      this.totalClicks = 0;
    }
  }
  addClick(click) {
    //avoid doing unusefull operations..
    if (this.totalClicks > 10) {
      return;
    }

    let parseDateResult = parseDate(click.timestamp);
    if (!parseDateResult) {
      return;
    }
    let periodValue = parseDateResult.periodMin;

    if (this.periods[periodValue]) {
      if (this.periods[periodValue].amount < click.amount) {
        this.periods[periodValue] = click;
      } else if (this.periods[periodValue].amount == click.amount) {
        let prevClickDate = parseDate(this.periods[periodValue].timestamp);
        if (parseDateResult.date < prevClickDate.date) {
          this.periods[periodValue] = click;
        }
      }
    } else {
      this.periods[periodValue] = click;
    }
    this.totalClicks += 1;
    if (this.totalClicks > 10) {
      this.periods = {};
    }
  }
}

module.exports = ClicksByIp;
