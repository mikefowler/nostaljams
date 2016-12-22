import { Record, List } from 'immutable';

const UserRecord = new Record({
  id: undefined,
  name: '',
  images: new List(),
  url: '',
}, 'User');

export default class User extends UserRecord {

  getImage() {
    return this.get('images').first().get('url');
  }

}
