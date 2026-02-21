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
import { Insult } from './typings';
import { insults } from './insults';
import { createArray } from './index';
import { pickRandom } from '@demotivator/shared';

/**
 * @returns a pseudorandom insult from the insult array.
 */
export default (array: Insult[] = insults): Insult => {
	const result = pickRandom(array);
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
export const insultAt = (position: number, array: Insult[] = createArray({
	packs: [
		'original'
	]
})): Insult => {
	if (!Number.isInteger(position)) throw new TypeError('Position must be an integer');
	if (position < 1 || position > array.length) throw new RangeError(`Position must be between 1 and ${array.length}`);
	const result = array[position - 1];
	if (!result) throw new Error('No insults available');
	return result;
};
