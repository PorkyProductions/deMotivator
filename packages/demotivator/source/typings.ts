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
 * @type Insult
 * an alias for the 'string' type for easier readibilty
 */
export type Insult = string

/**
 * An typesafe interface for `deMotivator` and `DeMotivator`
 *
 * @export
 * @interface __DeMotivator
 * @typedef {__DeMotivator}
 */
export interface __DeMotivator {
  insults: Insult[];
  profaneInsults: Insult[];
  createArray: (configuration: CreateArrayConfig) => Insult[];
  generateInsult: (array: Insult[]) => Insult;
  insultAt: (position: number, array: Insult[]) => Insult;
}

/**
 * A interface for the configuration options passed to `createArray`
 * @export
 * @interface CreateArrayConfig
 * @typedef {CreateArrayConfig}
 * @see createArray
 */
export interface CreateArrayConfig {
  original: boolean,
  profane: boolean,
}