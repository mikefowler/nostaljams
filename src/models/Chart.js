import { Record } from 'immutable';
import moment from 'moment';

const ChartRecord = new Record({
  id: undefined,
  start: undefined,
  end: undefined,
}, 'Chart');

export default class Chart extends ChartRecord {

  getStartDate() {
    return moment(this.get('start'), 'x');
  }

  getEndDate() {
    return moment(this.get('end'), 'x');
  }

}
