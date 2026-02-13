const countInsultWords = (insult: string): number => {
	const normalizedInsult = insult.trim();
	if (!normalizedInsult) {
		return 0;
	}
	return normalizedInsult.split(/\s+/).length;
};

const isInsultWithinWordLimit = (insult: string, maxWords: number): boolean => {
	if (maxWords <= 0) {
		return true;
	}
	return countInsultWords(insult) <= maxWords;
};

const filterInsultsByMaxWords = (insults: string[], maxWords: number): string[] => {
	return insults.filter((insult) => isInsultWithinWordLimit(insult, maxWords));
};

export { countInsultWords, isInsultWithinWordLimit, filterInsultsByMaxWords };
