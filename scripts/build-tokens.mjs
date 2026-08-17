import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const tokens = JSON.parse(await readFile(resolve(root, 'tokens/tokens.json'), 'utf8'));
const dist = resolve(root, 'dist');
await mkdir(dist, { recursive: true });

const css = [':root {'];
for (const [group, values] of Object.entries(tokens)) {
  if (group === 'type') continue;
  for (const [name, token] of Object.entries(values)) {
    if (typeof token?.value === 'string' && !token.value.startsWith('{')) css.push('  --cs-' + group + '-' + name + ': ' + token.value + ';');
  }
}
css.push('}', '');
await writeFile(resolve(dist, 'conqueror.css'), css.join('\n'));
await writeFile(resolve(dist, 'conqueror.ts'), 'export const conquerorTokens = ' + JSON.stringify(tokens, null, 2) + ' as const;\n');
console.log('Generated CDS token outputs');
