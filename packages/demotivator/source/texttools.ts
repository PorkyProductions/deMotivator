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

import { insultPacks } from './insults';
import { type Insult, type InsultPackInfo, type InsultPackKey, type InsultSearchResult } from './typings';

const profanityWords = [
	'bullshit',
	'fucking',
	'asshole',
	'bitch',
	'damn',
	'fuck',
	'shit',
	'ass'
] as const;

const assertInsult = (insult: Insult): void => {
	if (typeof insult !== 'string') throw new TypeError('Insult must be a string');
	if (insult.trim().length === 0) throw new Error('Insult cannot be empty');
};

const assertPositiveInteger = (value: number, label: string): void => {
	if (!Number.isInteger(value)) throw new TypeError(`${label} must be an integer`);
	if (value < 1) throw new RangeError(`${label} must be greater than 0`);
};

const getPackInfoFromInsult = (insult: Insult): InsultPackInfo<InsultPackKey> => {
	const packKeys = Object.keys(insultPacks) as InsultPackKey[];
	for (const packKey of packKeys) {
		const pack = insultPacks[packKey];
		const position = pack.insults.indexOf(insult);
		if (position >= 0) {
			return {
				insult,
				packKey,
				packTitle: pack.title,
				explicit: pack.explicit,
				position: position + 1
			};
		}
	}
	throw new Error('Insult not found in any built-in pack');
};

const buildMask = (length: number, symbol: string): string => {
	const repeatCount = Math.ceil(length / symbol.length);
	return symbol.repeat(repeatCount).slice(0, length);
};

const profaneWordRegex = new RegExp(`\\b(${profanityWords.join('|')})\\b`, 'gi');

/**
 * Masks profane words in an insult using a caller-selected symbol.
 * @param insult The insult string to purify.
 * @param symbol Replacement symbol. Defaults to `*`.
 * @returns The purified insult.
 * @since 15.0.0
 */
export const purify = (insult: Insult, symbol: string = '*'): Insult => {
	assertInsult(insult);
	if (typeof symbol !== 'string' || symbol.length === 0) throw new TypeError('Symbol must be a non-empty string');
	return insult.replace(profaneWordRegex, (word: string) => buildMask(word.length, symbol));
};

/**
 * Finds the first pack containing an insult.
 * Overloads:
 * - `packInfo(insult)`
 * - `packInfo(position, array?)`
 * - `packInfo(searchResult, array?)`
 * @since 15.1.0
 */
export function packInfo(insult: Insult): InsultPackInfo<InsultPackKey>;
export function packInfo(position: number, array?: Insult[]): InsultPackInfo<InsultPackKey>;
export function packInfo(searchResult: InsultSearchResult, array?: Insult[]): InsultPackInfo<InsultPackKey>;
export function packInfo(
	input: Insult | number | InsultSearchResult,
	array?: Insult[]
): InsultPackInfo<InsultPackKey> {
	if (typeof input === 'string') {
		assertInsult(input);
		return getPackInfoFromInsult(input);
	}

	if (typeof input === 'number') {
		assertPositiveInteger(input, 'Position');
		const sourceArray = array ?? insultPacks.original.insults;
		if (input > sourceArray.length) throw new RangeError(`Position must be between 1 and ${sourceArray.length}`);
		const insult = sourceArray[input - 1];
		if (!insult) throw new Error('No insults available');
		return getPackInfoFromInsult(insult);
	}

	if (typeof input === 'object' && input !== null) {
		assertPositiveInteger(input.position, 'Position');
		assertInsult(input.insult);
		if (!array) {
			return getPackInfoFromInsult(input.insult);
		}
		if (input.position > array.length) throw new RangeError(`Position must be between 1 and ${array.length}`);
		const insultAtPosition = array[input.position - 1];
		if (!insultAtPosition) throw new Error('No insults available');
		if (insultAtPosition !== input.insult) throw new Error('Search result does not match insult at the provided position in the supplied array');
		return getPackInfoFromInsult(insultAtPosition);
	}

	throw new TypeError('Invalid packInfo input');
}

/**
 * Inserts "Porky" into random positions in an insult.
 * @param insult The insult string to modify.
 * @param amount Number of times to insert "Porky". Defaults to `1`.
 * @returns The porkified insult.
 * @since 15.0.0
 */
export const porkify = (insult: Insult, amount: number = 1): Insult => {
	assertInsult(insult);
	assertPositiveInteger(amount, 'Amount');
	const tokens = insult.trim().split(/\s+/);
	for (let i = 0; i < amount; i++) {
		const insertPosition = Math.floor(Math.random() * (tokens.length + 1));
		tokens.splice(insertPosition, 0, 'Porky');
	}
	return tokens.join(' ');
};

/**
 * Uppercases an insult, removes ending punctuation, and appends exclamation marks.
 * @param insult The insult string to transform.
 * @param exclamationCount Number of trailing exclamation marks. Defaults to `3`.
 * @returns The angry version of the insult.
 * @since 15.0.0
 */
export const makeAngry = (insult: Insult, exclamationCount: number = 3): Insult => {
	assertInsult(insult);
	assertPositiveInteger(exclamationCount, 'Exclamation count');
	const withoutTrailingPunctuation = insult.trimEnd().replace(/[\p{P}\p{S}]+$/gu, '');
	return `${withoutTrailingPunctuation.toUpperCase()}${'!'.repeat(exclamationCount)}`;
};
