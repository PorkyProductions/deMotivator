import shuffle from 'lodash/shuffle'
export const bogosort = (input: number[], maxAttempts = 1000000): number[] => {
	const arr = input.slice();
	if (arr.length < 2) {
		return arr;
	}

	const isSorted = (a: number[]): boolean => {
		for (let i = 0; i < a.length - 1; i++) {
			if (a[i] > a[i + 1]) {
				return false;
			}
		}
		return true;
	};

	let attempts = 0;
	while (!isSorted(arr)) {
		if (++attempts > maxAttempts) {
			throw new Error('bogosort: reached maxAttempts');
		}
		shuffle(arr);
	}

	return arr;
};