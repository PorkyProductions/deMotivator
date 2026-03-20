import type { InsultPostProcessingSettings } from './userSettings';

interface InsultTransformOptions {
	exclamationCount?: number;
}

const minExclamationCount = 1;
const maxExclamationCount = 7;
const profanityCensorSymbol = '#';

const getRandomExclamationCount = (): number => Math.floor(Math.random() * maxExclamationCount) + minExclamationCount;

const shouldPostProcessInsult = (settings: InsultPostProcessingSettings): boolean => settings.angryMode || (settings.allowProfanity && settings.censorProfanity);

const transformInsultText = async (
	insult: string,
	settings: InsultPostProcessingSettings,
	options: InsultTransformOptions = {}
) => {
	if (!shouldPostProcessInsult(settings)) {
		return insult;
	}
	let transformedInsult = insult;
	const { makeAngry, purify } = await import('demotivator');
	if (settings.allowProfanity && settings.censorProfanity) {
		transformedInsult = purify(transformedInsult, profanityCensorSymbol);
	}
	if (settings.angryMode) {
		const exclamationCount = options.exclamationCount ?? getRandomExclamationCount();
		transformedInsult = makeAngry(transformedInsult, exclamationCount);
	}
	return transformedInsult;
};

export { transformInsultText, shouldPostProcessInsult, getRandomExclamationCount };
