import { injectGlobal } from 'styled-components';

import theme, { BASE_FONT_SIZE } from './theme';

injectGlobal`
  html {
    font-size: ${BASE_FONT_SIZE}px;
  }

  html,
  body {
    min-height: 100%;
  }

  body {
    display: flex;
    justify-content: center;
    margin: 0;
  }
`;
