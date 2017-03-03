import { h, Component } from 'preact';
import { css, withStyles } from '../utils/themes/withStyles';

class ViewPlaylistPage extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const { styles } = this.props;

    return (
      <div {...css(styles.container)}>
        ViewPlaylistPage
      </div>
    );
  }

}

export default withStyles(({ color }) => ({
  container: {
    backgroundColor: color.white,
  },
}))(ViewPlaylistPage);
