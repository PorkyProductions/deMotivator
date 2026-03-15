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
 * an alias for the 'string' type for easier readability
 */
export type Insult = string;

/**
 * A single insult pack definition.
 */
export interface InsultPack {
	key: string;
	title: string;
	explicit: boolean;
	insults: Insult[];
}

/**
 * A map of insult packs by key.
 */
export type InsultPackMap = Record<string, InsultPack>;
export type InsultPackKey = keyof typeof import('./insults').insultPacks;

/**
 * The object returned by `searchInsults` when called with `withPosition: true`.
 * The `position` field is 1-based to match the index convention used by `insultAt`.
 *
 * @export
 */
export interface InsultSearchResult {
	/** The most relevant insult found. */
	insult: Insult;
	/** 1-based position of the insult in the searched array. Pass directly to `insultAt`. */
	position: number;
}

/**
 * Overloaded call signatures for `searchInsults`.
 * @internal
 */
export interface SearchInsultsFunction {
	(term: string, array?: Insult[], withPosition?: false): Insult;
	(term: string, array: Insult[] | undefined, withPosition: true): InsultSearchResult;
}

/**
 * A typesafe interface for `deMotivator` and `DeMotivator`
 *
 * @export
 * @interface __DeMotivator
 */
export interface __DeMotivator<TPackKey extends string = InsultPackKey> {
	insults: Insult[];
	profaneInsults: Insult[];
	halloweenInsults: Insult[];
	christmasInsults: Insult[];
	valentinesInsults: Insult[];
	insultPacks: InsultPackMap;
	insultPackList: InsultPack[];
	createArray: (configuration: CreateArrayConfig<TPackKey>) => Insult[];
	generateInsult: (array: Insult[]) => Insult;
	insultAt: (position: number, array: Insult[]) => Insult;
	searchInsults: SearchInsultsFunction;
}

/**
 * An interface for the configuration options passed to `createArray`
 * @export
 * @interface CreateArrayConfig
 * @see createArray
 */
export interface CreateArrayConfig<TPackKey extends string = InsultPackKey> {
	packs: TPackKey[],
}
