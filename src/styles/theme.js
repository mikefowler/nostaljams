export const BASE_FONT_SIZE = 17;

const FONT_WEIGHT = {
  bold: 700,
  semibold: 600,
  normal: 500,
  light: 200,
};

const FONT_FAMILY = {
  default: '"-apple-system", "BlinkMacSystemFont", sans-serif',
};

function fontSize(size, lineHeight = 1) {
  const baseFontSize = parseInt(BASE_FONT_SIZE, 10);
  const desiredFontSize = parseInt(size, 10);

  const fontSizeRem = parseFloat((desiredFontSize / baseFontSize).toPrecision(4));

  return `
    font-size: ${fontSizeRem}rem;
    line-height: ${fontSizeRem * lineHeight}rem;
  `;
}

function buildFont({
  size,
  lineHeight,
  family = FONT_FAMILY.default,
  weight = FONT_WEIGHT.normal,
  letterSpacing = 0,
}) {
  return `
    ${fontSize(size, lineHeight)}
    font-family: ${family};
    font-weight: ${weight};
    letter-spacing: ${letterSpacing}px;
  `;
}

const font = {
  title1: buildFont({
    size: 30,
    weight: FONT_WEIGHT.light,
    letterSpacing: 2,
  }),
  title2: buildFont({
    size: 24,
  }),
  title3: buildFont({
    size: 22,
  }),
  headline: buildFont({
    size: 19,
    weight: FONT_WEIGHT.semibold,
  }),
  default: buildFont({
    size: 19,
  }),
  callout: buildFont({
    size: 18,
  }),
  subhead: buildFont({
    size: 17,
  }),
  footnote: buildFont({
    size: 15,
  }),
  caption1: buildFont({
    size: 14,
  }),
  caption2: buildFont({
    size: 13,
  }),
};

const color = {

  // Basic colors
  black: '#000',
  white: '#fff',
  green: '#2ebd59',
  orange: '#ff9220',

  // Named colors
  textLight: '#fff',
  textDark: '#333',

};

const gradient = {
  primary: `linear-gradient(135deg, ${color.green} 0%, ${color.orange} 100%)`,
};

export default {
  font,
  color,
  gradient,
  unit: 8,
};
