import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import Page from '../components/Page';
import PageContent from '../components/PageContent';
import Text from '../components/Text';
import Title from '../components/Title';
import { fetchWeeklyChartList } from '../actions/lastfm';

// ----------------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------------

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ fetchWeeklyChartList }, dispatch)
);

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

class ChartsPage extends Component {

  componentDidMount() {
    fetchWeeklyChartList();
  }

  render() {
    return (
      <Page>
        <PageContent>
          <Title contrast>Charts</Title>
        </PageContent>
      </Page>
    );
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChartsPage);
