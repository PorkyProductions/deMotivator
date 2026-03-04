import { filterInsultsByMaxWords } from '../../utils/insultLength';
import {
	resolveEnabledPackKeys,
	resolveWeightedPackEntries,
	type UserSettings
} from '../../utils/userSettings';

const insultPackCache = new Map<string, string[]>();
let deMotivatorModulePromise: Promise<typeof import('demotivator')> | null = null;

interface WeightedPackEntry {
weight: number;
}

const getInsultsForPacks = async (selectedPacks: string[]) => {
	const cacheKey = [...selectedPacks].sort().join('|');
	const cachedInsults = insultPackCache.get(cacheKey);
	if (cachedInsults) {
		return cachedInsults;
	}
	if (!deMotivatorModulePromise) {
		deMotivatorModulePromise = import('demotivator');
	}
	const { DeMotivator } = await deMotivatorModulePromise;
	const deMotivator = new DeMotivator();
	const loadedInsults = deMotivator.createArray({
		packs: selectedPacks as Parameters<typeof deMotivator.createArray>[0]['packs']
	});
	insultPackCache.set(cacheKey, loadedInsults);
	return loadedInsults;
};

const pickWeightedEntry = <T extends WeightedPackEntry>(entries: T[]): T | undefined => {
	const totalWeight = entries.reduce((sum, entry) => sum + Math.max(0, entry.weight), 0);
	if (totalWeight <= 0) {
		return undefined;
	}
	let remainingWeight = Math.random() * totalWeight;
	for (const entry of entries) {
		remainingWeight -= Math.max(0, entry.weight);
		if (remainingWeight < 0) {
			return entry;
		}
	}
	return entries[entries.length - 1];
};

const getRandomInsultFromSettings = async (settings: UserSettings): Promise<string | null> => {
	if (!settings.enablePackWeighting) {
		const selectedPacks = resolveEnabledPackKeys(settings);
		const insults = await getInsultsForPacks(selectedPacks);
		const filteredInsults = filterInsultsByMaxWords(insults, settings.maxInsultWords);
		if (filteredInsults.length === 0) {
			return null;
		}
		const randomIndex = Math.floor(Math.random() * filteredInsults.length);
		return filteredInsults[randomIndex] ?? null;
	}
	const weightedPackEntries = resolveWeightedPackEntries(settings).filter((entry) => entry.weight > 0);
	const weightedPackPools = await Promise.all(weightedPackEntries.map(async (entry) => {
		const packInsults = await getInsultsForPacks([entry.key]);
		return {
			key: entry.key,
			weight: entry.weight,
			insults: filterInsultsByMaxWords(packInsults, settings.maxInsultWords)
		};
	}));
	const availableWeightedPackPools = weightedPackPools.filter((pool) => pool.insults.length > 0);
	if (availableWeightedPackPools.length === 0) {
		return null;
	}
	const selectedPool = pickWeightedEntry(availableWeightedPackPools);
	if (!selectedPool || selectedPool.insults.length === 0) {
		return null;
	}
	const randomIndex = Math.floor(Math.random() * selectedPool.insults.length);
	return selectedPool.insults[randomIndex] ?? null;
};

export { getRandomInsultFromSettings };
