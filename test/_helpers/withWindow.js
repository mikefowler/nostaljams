import withGlobal from 'mocha-wrap/withGlobal';

export default function withWindow(mockWindow = () => ({})) {
  return this
    .use(withGlobal, 'window', mockWindow)
    .extend('with overridden window');
}
