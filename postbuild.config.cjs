const fs = require('fs');
const p = require('./package.json');

delete p.scripts;
delete p.devDependencies;

for (let k of ['main', 'module', 'types']) if (p[k]) p[k] = p[k].replace(/^dist\//, '');

if (p.exports && p.exports['.'])
	for (let k in p.exports['.']) p.exports['.'][k] = p.exports['.'][k].replace(/^\.\/dist\//, './');

fs.writeFileSync('./dist/package.json', JSON.stringify(p, null, 2));
fs.copyFileSync('./README.md', './dist/README.md');
