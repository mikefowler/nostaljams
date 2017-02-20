import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';

import LookupTrack from '../containers/LookupTrackContainer';
import { css, withStyles, withStylesPropTypes } from '../utils/themes/withStyles';

const propTypes = {
  ...withStylesPropTypes,
  fetchChartsForWeek: PropTypes.func.isRequired,
  user: PropTypes.string,
  charts: ImmutablePropTypes.orderedMap,
  playlist: ImmutablePropTypes.list,
};

const defaultProps = {
  tracksForTopArtists: new List(),
};

class ChartPage extends Component {

  componentDidMount() {
    const { charts, fetchChartsForWeek, user, location } = this.props;

    const chartId = parseInt(location.query.id, 10);
    const chart = charts.get(chartId);
    const from = chart.get('start');
    const to = chart.get('end');

    fetchChartsForWeek({ user, from, to });
  }

  render() {
    const { playlist, styles } = this.props;

    return (
      <div {...css(styles.container)}>

        <h2>Playlist</h2>

        <ol>
          {playlist.map(t => (
            <li key={t.get('id')}>
              <LookupTrack
                name={t.get('name')}
                artist={t.get('artist')}
                onFoundTrack={() => {}}
              />
            </li>
          ))}
        </ol>
      </div>
    );
  }

}

ChartPage.propTypes = propTypes;
ChartPage.defaultProps = defaultProps;

export default withStyles(({ color }) => ({
  container: {
    backgroundColor: color.white,
  },
}))(ChartPage);
