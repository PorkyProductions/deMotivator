/**
 * @license
 * Copyright 2024, PorkyProductions, and contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * sync-insults.mjs
 *
 * Reads the built demotivator npm package and generates the Python package's
 * insults.py data file so both packages stay in sync.
 *
 * Run via one of the wrapper scripts:
 *   scripts/sync-insults.bash  (bash)
 *   scripts/sync-insults.sh    (POSIX sh)
 *   scripts/sync-insults.ps1   (PowerShell)
 *
 * Or directly:
 *   node scripts/sync-insults.mjs
 */

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, '..');
const distInsults = join(repoRoot, 'packages', 'demotivator', 'dist', 'insults.js');
const outputPath = join(repoRoot, 'packages', 'demotivator-python', 'demotivator', 'insults.py');

console.log('Importing built demotivator package…');
const { insults, profaneInsults, insultPacks } = await import(distInsults);

/**
 * Escape a JavaScript string value so it is safe inside a Python single-quoted string.
 * @param {string} s
 * @returns {string}
 */
const escapePy = (s) =>
	s
		.replace(/\\/g, '\\\\')    // backslash first
		.replace(/'/g, "\\'");     // then single quotes

/**
 * Render a JS string array as a Python list literal (multi-line).
 * @param {string[]} arr
 * @param {string} indent
 * @returns {string}
 */
const pyList = (arr, indent = '\t') =>
	`[\n${arr.map((s) => `${indent}'${escapePy(s)}'`).join(',\n')},\n]`;

const lines = [
	'# Copyright 2024, PorkyProductions, and contributors',
	'# Licensed under the Apache License, Version 2.0',
	'#',
	'# AUTO-GENERATED — do not edit by hand.',
	'# Run scripts/sync-insults.bash (or .sh / .ps1) to regenerate from the npm package.',
	'',
	`insults = ${pyList(insults)}`,
	'',
	`profane_insults = ${pyList(profaneInsults)}`,
	'',
];

// Build insult_packs dict, referencing the Python variables above by name
// so the pack 'insults' keys point to the already-defined list objects.
const packEntries = Object.values(insultPacks).map((pack) => {
	const pyExplicit = pack.explicit ? 'True' : 'False';
	// Decide which Python variable holds this pack's insults
	const arrayRef = pack.explicit ? 'profane_insults' : 'insults';
	return (
		`\t'${escapePy(pack.key)}': {\n` +
		`\t\t'key': '${escapePy(pack.key)}',\n` +
		`\t\t'title': '${escapePy(pack.title)}',\n` +
		`\t\t'explicit': ${pyExplicit},\n` +
		`\t\t'insults': ${arrayRef},\n` +
		`\t}`
	);
});

lines.push(`insult_packs = {\n${packEntries.join(',\n')},\n}`);
lines.push('');
lines.push('insult_pack_list = list(insult_packs.values())');
lines.push('');

writeFileSync(outputPath, lines.join('\n'), 'utf8');
console.log(`✔  Written → ${outputPath}`);
