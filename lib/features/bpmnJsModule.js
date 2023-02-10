import { copyToModule } from '../utils/copyUtil.js';
import { addToPackageJson } from '../utils/npmUtil.js';

export function install() {

  // TODO: allow to replace placeholders in files
  copyToModule('resources/module');

  // TODO: make rollup bundling optional
  addToPackageJson({
    'main': 'lib/index.js',
  });
}


