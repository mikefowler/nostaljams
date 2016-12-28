const fontWeight = {
  normal: {
    fontWeight: 'normal',
  },
};

const fontSize = {
  default: {
    fontSize: 19,
  },
};

const fontFamily = {
  default: {
    fontFamily: 'sans-serif',
  },
};

export default {
  font: {
    default: {
      ...fontFamily.default,
      ...fontSize.default,
      ...fontWeight.normal,
    },
  },
  color: {
    black: '#000',
    white: '#fff',
  },
  unit: 8,
};
