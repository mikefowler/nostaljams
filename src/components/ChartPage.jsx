import { h, Component } from 'preact';

import LookupTrack from '../containers/LookupTrack';
import { css, withStyles } from '../utils/themes/withStyles';

class ChartPage extends Component {

  componentDidMount() {
    const { charts, chartId, fetchChartsForWeek, user } = this.props;
    const chart = charts.get(parseInt(chartId, 10));
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
          {playlist.toArray().map(t => (
            <li key={t.id}>
              <LookupTrack
                name={t.name}
                artist={t.artist}
                onFoundTrack={() => {}}
              />
            </li>
          ))}
        </ol>
      </div>
    );
  }

}

export default withStyles(({ color }) => ({
  container: {
    backgroundColor: color.white,
  },
}))(ChartPage);
