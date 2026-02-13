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

import { insults, profaneInsults } from './insults';
import generateInsult, { insultAt } from './generateinsult';
import {
	type __DeMotivator,
	type Insult,
	type CreateArrayConfig,
} from './typings';

export { insults, generateInsult, insultAt, type Insult, type CreateArrayConfig };


/**
 * createArray is a new function itroduced in version 12 that creates a custom insult array based on a configuration you provide.
 * @param {CreateArrayConfig} configuration an object that has two properties: profane, and original. Both of which accept a boolean value
 * @since 12.0.0
 * @see CreateArrayConfig
 * @returns {Insult[]} an array of insults
 */
export const createArray = (configuration: CreateArrayConfig): Insult[] => {
	if (configuration.profane && !configuration.original) {
		return profaneInsults;
	} else if (configuration.profane && configuration.original) {
		return insults.concat(profaneInsults);
	} else {
		return insults;
	}
};


/**
 * The main deMotivator object.
 * Contains all the functions and properties of the deMotivator.
 * @date 6/15/2023 - 11:37:58 AM
 * @export
 * @type {__DeMotivator}
 */
export const deMotivator: __DeMotivator = {
	insults: insults,
	profaneInsults: profaneInsults,
	createArray: createArray,
	generateInsult: generateInsult,
	insultAt: insultAt,
};
export default deMotivator;

/**
 * A class version of the `deMotivator` object
 * @see deMotivator
 * @export
 * @class DeMotivator
 * @typedef {DeMotivator}
 * @implements {__DeMotivator}
 */
export class DeMotivator implements __DeMotivator {
	/**
   * The entire insults array
   * @date 6/15/2023 - 11:39:04 AM
   *
   * @type {Insult[]}
   */
	insults: Insult[] = insults;
	/**
   * All of the profane insults
   * @date 6/15/2023 - 11:39:04 AM
   *
   * @type {Insult[]}
   */
	profaneInsults: Insult[] = profaneInsults;
	/**
   * Creates a basic array of insults.
   * @date 6/15/2023 - 11:39:04 AM
   * @internal
   * @private
   * @returns {Insult[]}
   */
	private __createBasicArray(): Insult[] {
		return createArray({ original: true, profane: false }) as Insult[];
	}
	/**
   * Creates a custom insult array based on a configuration you provide.
   * @date 6/15/2023 - 11:39:04 AM
   * @external
   * @public
   * @param {CreateArrayConfig} configuration
   * @returns {Insult[]}
   */
	public createArray(configuration: CreateArrayConfig): Insult[] {
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
}
