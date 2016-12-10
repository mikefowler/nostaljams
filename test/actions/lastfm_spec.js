import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import nock from 'nock';
import { normalize } from 'normalizr';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const Schemas = __helper.requireDefault('store/schemas');
const lastfm = __helper.requireDefault('utils/lastfm');
const actions = __helper.requireDefault('actions/lastfm');

describe('lastfm action creators', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('fetchWeeklyTrackChart', () => {
    it('creates FETCH_WEEKLY_TRACKS_SUCCEEDED when fetching tracks is complete', () => {
      const response = {
        weeklytrackchart: {
          track: [{
            artist: {
              '#text': 'Mike',
            },
            name: 'My Song',
          }],
        },
      };

      const stub = sinon.stub(lastfm, 'get').returns(Promise.resolve(response));

      const expectedActions = [{
        type: actions.FETCH_WEEKLY_TRACKS_REQUESTED,
      }, {
        type: actions.FETCH_WEEKLY_TRACKS_SUCCEEDED,
        payload: normalize(response.weeklytrackchart.track, Schemas.TRACK_ARRAY),
      }];

      const store = mockStore({ lastfm: { username: 'mike', tracks: [] } });

      return store.dispatch(actions.fetchWeeklyTrackChart())
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          stub.restore();
        });
    });
  });
});
