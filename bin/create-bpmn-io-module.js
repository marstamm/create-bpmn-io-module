#!/usr/bin/env node

import { initialize, setupProject } from '../lib/init.js';
import { getPackageName } from '../lib/utils/npmUtil.js';

const projectName = process.argv[2];

if (projectName) {
  setupProject(projectName);
}

initialize(projectName || getPackageName());
