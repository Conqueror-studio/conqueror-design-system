import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const tokens = JSON.parse(await readFile(resolve(root, 'tokens/tokens.json'), 'utf8'));
for (const group of ['color', 'space', 'type', 'motion']) {
  if (!tokens[group] || typeof tokens[group] !== 'object') throw new Error('Missing token group: ' + group);
}
if (JSON.stringify(tokens).includes('TODO')) throw new Error('Token document contains TODO');
console.log('CDS token validation passed');
