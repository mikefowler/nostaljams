import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import Page from '../components/Page';
import PageContent from '../components/PageContent';
import Text from '../components/Text';

// ----------------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------------

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ }, dispatch)
);

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

function ViewPlaylistPage() {
  return (
    <Page>
      <PageContent>
        <Text>ViewPlaylistPage</Text>
      </PageContent>
    </Page>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPlaylistPage);
