import spawn from 'cross-spawn';
import fs from 'fs-extra';
import path from 'path';

import { installBpmnJsModule, installEsLint, installMocha, installRollup } from './features/index.js';
import { copyAndReplace } from './utils/copyUtil.js';
import { getPackageName, initIfNeeded, installDependencies } from './utils/npmUtil.js';

export const initialize = (projectName) => {

  // init project
  initIfNeeded();
  createGitingore();
  projectName = projectName || getPackageName();
  copyAndReplace('resources/base', {
    '{{projectName}}': projectName,
    '{{currentYear}}': new Date().getFullYear()
  });

  // add features
  installEsLint();
  installBpmnJsModule();
  installMocha();
  installRollup();

  // Ensure we run npm install only once
  installDependencies();
};


export const setupProject = name => {
  const requestedPath = path.join(process.cwd(), name);

  if (!fs.pathExistsSync(requestedPath)) {
    fs.mkdirSync(name);
  }

  process.chdir(requestedPath);
  initGit();
};

function initGit() {
  const initProcess = spawn.sync('git', [ 'init' ],
    { stdio: 'inherit' });
  const error = initProcess.error;

  if (error && error.code === 'ENOENT') {
    console.error('Could not execute git.');
  }
}

function createGitingore() {
  // We need to manually add `.gitignore` because npm 
  // does not want to publish files with this name,
  // so it can't be copied from `resources`.
  const cwd = process.cwd();
  const gitIgnorePath = path.join(cwd, '.gitignore');
  if (!fs.pathExistsSync(gitIgnorePath)) {
    fs.writeFileSync(gitIgnorePath, ['node_modules', 'dist'].join('\n'));
  }
}