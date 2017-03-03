import { h, Component } from 'preact';
import { css, withStyles } from '../utils/themes/withStyles';

class LookupTrack extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    const { lookupTrack, name, artist } = this.props;

    lookupTrack({
      track: name,
      artist,
    });
  }

  render() {
    const { name, artist, styles } = this.props;

    return (
      <div {...css(styles.container)}>
        <p>“{name}” by {artist}</p>
      </div>
    );
  }

}

export default withStyles(({ color }) => ({
  container: {
    backgroundColor: color.white,
  },
}))(LookupTrack);
