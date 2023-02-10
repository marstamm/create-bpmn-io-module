import { copyToModule } from '../utils/copyUtil.js';
import { addScript, addDevDependency } from '../utils/npmUtil.js';

const bpmnJsDeps = [
  'bpmn-js',
  'bpmn-js-properties-panel',
  'camunda-bpmn-js-behaviors',
  'zeebe-bpmn-moddle'
];

const TestingDependencies = [
  '@testing-library/preact',
  'downloadjs',
  'cross-env',
  'file-drops',
  'karma',
  'karma-chrome-launcher',
  'karma-coverage',
  'karma-debug-launcher',
  'karma-env-preprocessor',
  'karma-mocha',
  'karma-sinon-chai',
  'karma-webpack',
  'mocha',
  'mocha-test-container-support',
  'npm-run-all',
  'puppeteer',
  'raw-loader',
  'sinon',
  'sinon-chai',
  'webpack'
];

export function install() {
  addDevDependency(
    [
      ...bpmnJsDeps,
      ...TestingDependencies

    ]);

  copyToModule('resources/mocha');

  addScript({
    'dev': 'npm test -- --auto-watch --no-single-run',
    'start': 'cross-env SINGLE_START=true npm run dev',
    'test': 'karma start karma.config.js'
  });
}


