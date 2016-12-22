import { PropTypes } from 'react';
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import aphroditeInterface from 'react-with-styles-interface-aphrodite';
import { css, withStyles, ThemeProvider } from 'react-with-styles';

import Theme from './theme';

ThemedStyleSheet.registerDefaultTheme(Theme);
ThemedStyleSheet.registerInterface(aphroditeInterface);

const withStylesPropTypes = {
  styles: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export { css, withStyles, withStylesPropTypes, ThemeProvider, ThemedStyleSheet };
