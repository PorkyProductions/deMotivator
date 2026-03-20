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

import {
	insults,
	profaneInsults,
	halloweenInsults,
	christmasInsults,
	valentinesInsults,
	stPatricksInsults,
	insultPacks,
	insultPackList
} from './insults';

import generateInsult, { insultAt, searchInsults } from './generateinsult';
import { purify, packInfo, porkify, makeAngry } from './texttools';
import {
	type __DeMotivator,
	type Insult,
	type CreateArrayConfig,
	type InsultPackKey,
	type InsultPack,
	type InsultPackMap,
	type InsultSearchResult,
	type InsultPackInfo,
	type SearchInsultsFunction
} from './typings';

export {
	insults,
	profaneInsults,
	halloweenInsults,
	christmasInsults,
	valentinesInsults,
	stPatricksInsults,
	insultPacks,
	insultPackList,
	generateInsult,
	insultAt,
	searchInsults,
	purify,
	packInfo,
	porkify,
	makeAngry,
	type Insult,
	type InsultPack,
	type InsultPackMap,
	type InsultSearchResult,
	type InsultPackInfo,
	type CreateArrayConfig
};

/**
 * createArray is a new function introduced in version 12 that creates a custom insult array based on a configuration you provide.
 * @param {CreateArrayConfig} configuration an object with the `packs` field containing insult pack IDs.
 * @since 12.0.0
 * @see CreateArrayConfig
 * @returns {Insult[]} an array of insults
 */
export const createArray = (configuration: CreateArrayConfig<InsultPackKey>): Insult[] => {
	const selectedPackKeys = new Set(configuration.packs);
	const selectedInsults: Insult[] = [];
	for (const selectedPackKey of selectedPackKeys) {
		const selectedPack = insultPacks[selectedPackKey];
		if (!selectedPack) {
			continue;
		}
		selectedInsults.push(...selectedPack.insults);
	}
	if (configuration.customPacks) {
		const seenKeys = new Set<string>();
		for (const cp of configuration.customPacks) {
			if (!seenKeys.has(cp.key)) {
				seenKeys.add(cp.key);
				selectedInsults.push(...cp.insults);
			}
		}
	}
	return selectedInsults;
};

/**
 * An identity-function helper for defining a custom insult pack with full TypeScript inference.
 * @param pack The custom pack object to define.
 * @returns The same pack object, typed as `InsultPack`.
 * @since 13.0.0
 */
export const defineCustomPack = (pack: InsultPack): InsultPack => pack;

/**
 * The main deMotivator object.
 * Contains all the functions and properties of the deMotivator.
 * @date 6/15/2023 - 11:37:58 AM
 * @export
 * @type {__DeMotivator}
 */
export const deMotivator: __DeMotivator<InsultPackKey> = {
	insults: insults,
	profaneInsults: profaneInsults,
	halloweenInsults: halloweenInsults,
	christmasInsults: christmasInsults,
	valentinesInsults: valentinesInsults,
	stPatricksInsults: stPatricksInsults,
	insultPacks: insultPacks,
	insultPackList: insultPackList,
	createArray: createArray,
	defineCustomPack: defineCustomPack,
	generateInsult: generateInsult,
	insultAt: insultAt,
	searchInsults: searchInsults as SearchInsultsFunction,
	purify: purify,
	packInfo: packInfo,
	porkify: porkify,
	makeAngry: makeAngry
};
export default deMotivator;

/**
 * A class version of the `deMotivator` object
 * @see deMotivator
 * @export
 * @class DeMotivator
 * @implements {__DeMotivator}
 */
export class DeMotivator implements __DeMotivator<InsultPackKey> {
	/**
   * The entire insults array
   * @date 6/15/2023 - 11:39:04 AM
   *
   * @type {Insult[]}
   */
	insults: Insult[] = insults;
	/**
   * All the profane insults
   * @date 6/15/2023 - 11:39:04 AM
   *
   * @type {Insult[]}
   */
	profaneInsults: Insult[] = profaneInsults;
	/**
	 * All the Halloween insults
	 * @date 2/23/2026 - 11:19:35 PM
	 */
	halloweenInsults: Insult[] = halloweenInsults;
	/**
	 * All the Christmas insults
	 * @date 2/23/2026 - 11:41:23 PM
	 */
	christmasInsults: Insult[] = christmasInsults;
	/**
	 * All the Valentine's Day insults
	 * @date 3/14/2026
	 */
	valentinesInsults: Insult[] = valentinesInsults;
	/**
	 * All the St. Patrick's Day insults
	 * @date 3/16/2026
	 */
	stPatricksInsults: Insult[] = stPatricksInsults;
	/**
   * A map of all available insult packs by key.
   * @date 2/19/2026
   *
   * @type {InsultPackMap}
   */
	insultPacks: InsultPackMap = insultPacks;
	/**
   * A list of all available insult packs.
   * @date 2/19/2026
   *
   * @type {InsultPack[]}
   */
	insultPackList: InsultPack[] = insultPackList;
	/**
   * Creates a basic array of insults.
   * @date 6/15/2023 - 11:39:04 AM
   * @internal
   * @private
   * @returns {Insult[]}
   */
	private __createBasicArray(): Insult[] {
		return createArray({ packs: ['original'] }) as Insult[];
	}
	/**
   * Creates a custom insult array based on a configuration you provide.
   * @date 6/15/2023 - 11:39:04 AM
   * @external
   * @public
   * @param {CreateArrayConfig} configuration
   * @returns {Insult[]}
   */
	public createArray(configuration: CreateArrayConfig<InsultPackKey>): Insult[] {
		return createArray(configuration);
	}
	/**
   * Returns its argument typed as `InsultPack`. An identity helper for TypeScript inference.
   * @public
   * @param {InsultPack} pack
   * @returns {InsultPack}
   */
	public defineCustomPack(pack: InsultPack): InsultPack {
		return defineCustomPack(pack);
	}
	/**
   * Grabs a random insult from the insults array.
   * @date 6/15/2023 - 11:39:04 AM
   *
   * @public
   * @param {Insult[]} [array=this.__createBasicArray()]
   * @returns {Insult}
   */
	public generateInsult(array: Insult[] = this.__createBasicArray()): Insult {
		return generateInsult(array);
	}
	/**
   * Gets an insult at a specific position in the insults array.
   * @date 6/15/2023 - 11:39:04 AM
   *
   * @public
   * @param {number} position
   * @param {Insult[]} [array=this.__createBasicArray()]
   * @returns {Insult}
   */
	public insultAt(position: number,array: Insult[] = this.__createBasicArray()): Insult {
		return insultAt(position, array);
	}
	/**
   * Searches for the most relevant insult matching a search term.
   * @public
   * @param {string} term The search string to match against each insult.
   * @param {Insult[]} [array] The pool of insults to search. Defaults to the original pack.
   * @param {false} [withPosition] Return just the insult string (default).
   * @returns {Insult}
   */
	public searchInsults(term: string, array?: Insult[], withPosition?: false): Insult;
	/**
   * @public
   * @param {string} term The search string to match against each insult.
   * @param {Insult[] | undefined} array The pool of insults to search. Pass `undefined` to use the default.
   * @param {true} withPosition Return an `InsultSearchResult` with the insult and its 1-based position.
   * @returns {InsultSearchResult}
   */
	public searchInsults(term: string, array: Insult[] | undefined, withPosition: true): InsultSearchResult;
	public searchInsults(term: string, array: Insult[] = this.__createBasicArray(), withPosition: boolean = false): Insult | InsultSearchResult {
		return searchInsults(term, array, withPosition as false);
	}
	/**
	 * Masks profane words in an insult using a selected replacement symbol.
	 * @param {Insult} insult
	 * @param {string} [symbol='*']
	 * @returns {Insult}
	 */
	public purify(insult: Insult, symbol: string = '*'): Insult {
		return purify(insult, symbol);
	}
	/**
	 * Finds the first built-in pack that contains the insult and its 1-based position.
	 * @param {Insult} insult
	 * @returns {InsultPackInfo}
	 */
	public packInfo(insult: Insult): InsultPackInfo<InsultPackKey>;
	/**
	 * Finds pack info using a 1-based position in a specific array.
	 * @param {number} position
	 * @param {Insult[]} [array=this.__createBasicArray()]
	 * @returns {InsultPackInfo}
	 */
	public packInfo(position: number, array?: Insult[]): InsultPackInfo<InsultPackKey>;
	/**
	 * Finds pack info from `searchInsults(..., true)` and optionally verifies against a provided array.
	 * @param {InsultSearchResult} searchResult
	 * @param {Insult[]} [array=this.__createBasicArray()]
	 * @returns {InsultPackInfo}
	 */
	public packInfo(searchResult: InsultSearchResult, array?: Insult[]): InsultPackInfo<InsultPackKey>;
	public packInfo(input: Insult | number | InsultSearchResult, array: Insult[] = this.__createBasicArray()): InsultPackInfo<InsultPackKey> {
		if (typeof input === 'string') {
			return packInfo(input);
		}
		if (typeof input === 'number') {
			return packInfo(input, array);
		}
		return packInfo(input, array);
	}
	/**
	 * Inserts the word "Porky" into random positions in an insult.
	 * @param {Insult} insult
	 * @param {number} [amount=1]
	 * @returns {Insult}
	 */
	public porkify(insult: Insult, amount: number = 1): Insult {
		return porkify(insult, amount);
	}
	/**
	 * Uppercases an insult, strips trailing punctuation, and appends exclamation marks.
	 * @param {Insult} insult
	 * @param {number} [exclamationCount=3]
	 * @returns {Insult}
	 */
	public makeAngry(insult: Insult, exclamationCount: number = 3): Insult {
		return makeAngry(insult, exclamationCount);
	}
}
