import { Record, List, OrderedMap } from 'immutable';
import moment from 'moment';

// ----------------------------------------------------------------------------
// Chart
// ----------------------------------------------------------------------------

const ChartRecord = new Record({
  id: undefined,
  start: undefined,
  end: undefined,
}, 'Chart');

export class Chart extends ChartRecord {

  getStartDate() {
    return moment(this.get('start'), 'x');
  }

  getEndDate() {
    return moment(this.get('end'), 'x');
  }

}

// ----------------------------------------------------------------------------
// Chart Map
// ----------------------------------------------------------------------------

export const ChartMap = OrderedMap;

// ----------------------------------------------------------------------------
// User
// ----------------------------------------------------------------------------

const UserRecord = new Record({
  id: undefined,
  name: '',
  images: new List(),
  url: '',
}, 'User');

export class User extends UserRecord {

  getImage() {
    return this.get('images').first().get('url');
  }

}
