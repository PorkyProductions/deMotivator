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
import { Insult, InsultSearchResult } from './typings';
import { insults } from './insults';
import s from 'lodash/sample';

/**
 * Scores how relevant an insult is to a given (pre-lowercased) search term.
 *
 * | Score | Condition |
 * |-------|-----------|
 * | 4 | Exact match (case-insensitive) |
 * | 3 | Insult starts with the term |
 * | 2 | Term appears as a whole word inside the insult |
 * | 1 | Term appears anywhere as a substring |
 * | 0 | No match |
 *
 * @internal
 */
const scoreInsult = (insult: string, normalizedTerm: string, wordBoundaryRegex: RegExp): number => {
	const normalizedInsult = insult.toLowerCase();
	if (normalizedInsult === normalizedTerm) return 4;
	if (normalizedInsult.startsWith(normalizedTerm)) return 3;
	if (wordBoundaryRegex.test(insult)) return 2;
	if (normalizedInsult.includes(normalizedTerm)) return 1;
	return 0;
};

/**
 * @returns a pseudorandom insult from the insult array.
 */
export default (array: Insult[] = insults): Insult => {
	const result = s(array);
	if (!result) throw new Error('No insults available');
	return result;
};

/**
 * Get a specific insult from a point and array that you specify
 *
 * @param {Insult[]} [array=insults] The array to select from. Default is original only
 * @param {number} position The position in the array to select. Starts indexing at 1, not 0.
 * @returns {Insult}
 */
export const insultAt = (position: number, array: Insult[] = insults): Insult => {
	if (!Number.isInteger(position)) throw new TypeError('Position must be an integer');
	if (position < 1 || position > array.length) throw new RangeError(`Position must be between 1 and ${array.length}`);
	const result = array[position - 1];
	if (!result) throw new Error('No insults available');
	return result;
};

/**
 * Searches the provided insult array for the single most relevant match to `term`.
 *
 * Relevance is determined by the following priority (highest first):
 *
 * 1. **Exact match** — the insult equals the term (case-insensitive).
 * 2. **Prefix match** — the insult starts with the term.
 * 3. **Whole-word match** — the term appears as a complete word inside the insult.
 * 4. **Substring match** — the term appears anywhere inside the insult.
 *
 * When multiple insults share the same highest score the first one encountered is returned.
 *
 * @param {string} term The search string to match against each insult.
 * @param {Insult[]} [array] The pool of insults to search. Defaults to the original pack.
 * @param {false} [withPosition] Return just the insult string (default).
 * @returns {Insult} The most relevant insult found.
 * @throws {Error} If the array is empty.
 * @throws {Error} If no insult matches the term.
 * @since 14.0.0
 */
export function searchInsults(term: string, array?: Insult[], withPosition?: false): Insult;
/**
 * @param {string} term The search string to match against each insult.
 * @param {Insult[] | undefined} array The pool of insults to search. Pass `undefined` to use the default original pack.
 * @param {true} withPosition Return an `InsultSearchResult` containing the insult and its 1-based position, compatible with `insultAt`.
 * @returns {InsultSearchResult}
 * @throws {Error} If the array is empty.
 * @throws {Error} If no insult matches the term.
 * @since 14.0.0
 */
export function searchInsults(term: string, array: Insult[] | undefined, withPosition: true): InsultSearchResult;
export function searchInsults(
	term: string,
	array: Insult[] = insults,
	withPosition: boolean = false
): Insult | InsultSearchResult {
	if (array.length === 0) throw new Error('No insults available');
	const normalizedTerm = term.toLowerCase();
	const escapedTerm = normalizedTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const wordBoundaryRegex = new RegExp(`\\b${escapedTerm}\\b`, 'i');

	let bestMatch: Insult | undefined;
	let bestIndex = -1;
	let bestScore = 0;

	for (let i = 0; i < array.length; i++) {
		const insult = array[i]!;
		const score = scoreInsult(insult, normalizedTerm, wordBoundaryRegex);
		if (score > bestScore) {
			bestScore = score;
			bestMatch = insult;
			bestIndex = i;
		}
		if (bestScore === 4) break; // exact match — can't do better
	}

	if (!bestMatch) throw new Error(`No insults found matching "${term}"`);
	return withPosition ? { insult: bestMatch, position: bestIndex + 1 } : bestMatch;
}
