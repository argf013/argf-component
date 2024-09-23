const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const latestVersion = execSync('pnpm info argf-react --json')
    .toString()
    .match(/"latest":\s*"(.*?)"/)[1];

const packageJsonPath = path.resolve(__dirname, 'package.json');

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

packageJson.version = latestVersion;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log(`Updated package.json to version ${latestVersion}`);