#!/usr/bin/env node

import { initialize, setupProject } from '../lib/init.js';

const projectName = process.argv[2];

if (projectName) {
  setupProject(projectName);
}

initialize(projectName);
