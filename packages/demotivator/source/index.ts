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
	insultPacks,
	insultPackList
} from './insults';

import generateInsult, { insultAt, searchInsults } from './generateinsult';
import {
	type __DeMotivator,
	type Insult,
	type CreateArrayConfig,
	type InsultPackKey,
	type InsultPack,
	type InsultPackMap,
	type InsultSearchResult
} from './typings';

export {
	insults,
	profaneInsults,
	halloweenInsults,
	christmasInsults,
	valentinesInsults,
	insultPacks,
	insultPackList,
	generateInsult,
	insultAt,
	searchInsults,
	type Insult,
	type InsultPack,
	type InsultPackMap,
	type InsultSearchResult,
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
	return selectedInsults;
};

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
	insultPacks: insultPacks,
	insultPackList: insultPackList,
	createArray: createArray,
	generateInsult: generateInsult,
	insultAt: insultAt,
	searchInsults: searchInsults
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
}
