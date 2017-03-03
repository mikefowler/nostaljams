import { h, Component } from 'preact';
import { css, withStyles } from '../utils/themes/withStyles';

class Template extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const { styles } = this.props;

    return (
      <div {...css(styles.container)}>
        Template
      </div>
    );
  }

}

export default withStyles(({ color }) => ({
  container: {
    backgroundColor: color.white,
  },
}))(Template);
