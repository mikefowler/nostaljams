import { h } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import { route } from 'preact-router';

import Page from '../components/Page';
import PageContent from '../components/PageContent';
import PageFooter from '../components/PageFooter';
import Button from '../components/Button';
import Title from '../components/Title';
import Text from '../components/Text';
import Spacing from '../components/Spacing';
import Centered from '../components/Centered';
import IconLogo from '../components/icons/IconLogo';

// ----------------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------------

const mapStateToProps = () => ({

});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ }, dispatch)
);

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

function HomePage() {
  return (
    <Page>
      <PageContent>
        <Spacing horizontal={2} top={4}>
          <Centered horizontal>
            <Spacing bottom={4}>
              <IconLogo size={96} color="white" />
            </Spacing>
            <Title contrast>Nostaljams</Title>
            <Text center light contrast>
              Create Spotify playlists from your Last.fm listening history.
            </Text>
          </Centered>
        </Spacing>
      </PageContent>
      <PageFooter>
        <Spacing vertical={4} horizontal={2}>
          <Button
            block
            onClick={() => route('/login')}
          >
            Log in
          </Button>
        </Spacing>
      </PageFooter>
    </Page>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
