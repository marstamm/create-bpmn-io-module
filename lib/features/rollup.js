import { copyToModule } from '../utils/copyUtil.js';
import { addScript, addToPackageJson, addDevDependency } from '../utils/npmUtil.js';

export function install() {
  addDevDependency([
    '@rollup/plugin-commonjs',
    '@rollup/plugin-json',
    'rollup'
  ]);

  copyToModule('resources/rollup');

  addScript({
    'build': 'rollup -c',
    'build:watch': 'rollup -cw',
    'prepare': 'run-s build'
  });

  addToPackageJson({
    'files': [
      'dist'
    ],
    'main': 'dist/index.js',
    'module': 'dist/index.es.js',
  });
}