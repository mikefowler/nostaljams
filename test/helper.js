import 'es5-shim';
import 'isomorphic-fetch';
import promise from 'es6-promise';
import path from 'path';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiEnzyme from 'chai-enzyme';
import wrap from 'mocha-wrap';
import pick from 'lodash/pick';

import withWindow from './_helpers/withWindow';

promise.polyfill();

chai.use(sinonChai);
chai.use(chaiEnzyme());

wrap.register(withWindow);

const helper = global.__helper = {}; // eslint-disable-line no-underscore-dangle
const assetPathPrefix = '../src';

helper.requireDefault = function requireDefault(srcPath) {
  const modulePath = path.join(assetPathPrefix, srcPath);
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const module = require(modulePath);
  if (!module) return module;
  return module.default || module;
};

helper.requireNamed = function requireNamed(srcPath, ...names) {
  if (names.includes('default')) {
    throw new TypeError('require the default separately, with __helper.requireDefault');
  }
  const modulePath = path.join(assetPathPrefix, srcPath);
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const module = require(modulePath);
  if (!module) return module;
  return pick(module, names);
};
