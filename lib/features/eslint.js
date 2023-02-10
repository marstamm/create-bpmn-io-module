import { copyToModule } from '../utils/copyUtil.js';
import { addScript, addDevDependency } from '../utils/npmUtil.js';

export function install() {
  addDevDependency([ 'eslint', 'eslint-plugin-bpmn-io' ]);
  copyToModule('resources/eslint');

  addScript({
    'lint': 'eslint .',
  });
}


