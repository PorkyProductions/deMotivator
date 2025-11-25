const storageKey = 'demotivator-favorites';

export const getFavorites = (): string[] => {
	if (typeof localStorage === 'undefined') return [];
	try {
		const stored = localStorage.getItem(storageKey);
		return stored ? JSON.parse(stored) : [];
	} catch {
		return [];
	}
};

export const addFavorite = (insult: string): void => {
	if (typeof localStorage === 'undefined') return;
	const favorites = getFavorites();
	if (!favorites.includes(insult)) {
		favorites.push(insult);
		localStorage.setItem(storageKey, JSON.stringify(favorites));
	}
};

export const removeFavorite = (insult: string): void => {
	if (typeof localStorage === 'undefined') return;
	const favorites = getFavorites().filter((f) => f !== insult);
	localStorage.setItem(storageKey, JSON.stringify(favorites));
};

export const isFavorite = (insult: string): boolean => {
	return getFavorites().includes(insult);
};

export const toggleFavorite = (insult: string): boolean => {
	if (isFavorite(insult)) {
		removeFavorite(insult);
		return false;
	} else {
		addFavorite(insult);
		return true;
	}
};
