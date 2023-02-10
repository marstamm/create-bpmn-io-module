import fs from 'fs-extra';
import path from 'path';
import spawn from 'cross-spawn';


const DEFAULT_CONFIG = {
  'version': '0.0.0',
  'repository': {
    'type': 'git',
    'url': ''
  },
  'publishConfig': {
    'access': 'public'
  },
  'keywords': [
    'bpmn-io'
  ],
  'contributors': [
    {
      'name': 'bpmn.io contributors',
      'url': 'https://github.com/bpmn-io'
    }
  ],
  'license': 'MIT'
};

const devDependencies = [];

export function addDevDependency(packages) {
  const packageList = Array.isArray(packages) ? packages : [ packages ];

  devDependencies.push(...packageList);
}

export function installDependencies() {

  const installProcess = spawn.sync('npm', [ 'install', '-D' ].concat(devDependencies),
    { stdio: 'inherit' });
  const error = installProcess.error;

  if (error && error.code === 'ENOENT') {
    console.error('Could not execute npm.');
  }
}

export function addScript(scripts) {
  const packagePath = getPackagePath();

  const packageJson = fs.readJsonSync(packagePath);
  const packageScripts = packageJson.scripts;

  for (const script in scripts) {
    packageScripts[script] = scripts[script];
  }

  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
}

export function addToPackageJson(config) {
  const packagePath = getPackagePath();

  const packageJson = fs.readJsonSync(packagePath);

  const newPackage = {
    ...packageJson,
    ...config
  };

  fs.writeFileSync(packagePath, JSON.stringify(newPackage, null, 2));
}

export function initIfNeeded() {
  const packagePath = getPackagePath();

  if (!fs.pathExistsSync(packagePath)) {
    const initProcess = spawn.sync('npm', [ 'init', '-y' ],
      { stdio: 'inherit' });
    const error = initProcess.error;

    if (error && error.code === 'ENOENT') {
      console.error('Could not execute npm.');
      return;
    }

    addDefaultConfig();
  }
}

export function getPackageName() {
  const packagePath = getPackagePath();
  const packageJson = fs.readJsonSync(packagePath);

  return packageJson.name;
}

function addDefaultConfig() {
  const config = DEFAULT_CONFIG;

  const packagePath = getPackagePath();
  const packageJson = fs.readJsonSync(packagePath);

  config.repository.url = `git+https://github.com/bpmn-io/${withoutPrefix(packageJson.name)}.git`;

  addToPackageJson(DEFAULT_CONFIG);
}

function getPackagePath() {
  const cwd = process.cwd();
  return path.join(cwd, 'package.json');
}

function withoutPrefix(name) {
  return name.replace(/^@bpmn-io\//, '');
}
