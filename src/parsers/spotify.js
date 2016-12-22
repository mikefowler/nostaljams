// @TODO: remove next line once there are multiple exports
/* eslint-disable import/prefer-default-export */

import { List } from 'immutable';

import User from '../models/User';

export function parseUser(response) {
  return new User({
    id: response.id,
    name: response.display_name,
    url: response.external_urls ? response.external_urls.spotify : '',
    images: new List(response.images),
  });
}
