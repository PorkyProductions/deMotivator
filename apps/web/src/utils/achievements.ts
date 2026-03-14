/**
 * ACHIEVEMENTS API HOW-TO
 *
 * 1) Unlock one specific achievement anywhere in the app:
 *    `await achievementUnlockers.hedgehogEggFound();`
 *
 * 2) Create a linked unlock function and place it in your own flow:
 *    `const unlockFirstInsult = createAchievementUnlocker('firstInsult');`
 *    `await unlockFirstInsult();`
 *
 * 3) Unlock insult milestones from a running total (normal + retroactive):
 *    `await syncMilestoneAchievements(totalInsultsSeen);`
 *
 * 4) Read only earned achievements (for analytics or logic):
 *    `const earned = await readEarnedAchievements();`
 *
 * 5) Read all achievements with earned/locked state (for profile UI):
 *    `const cards = await readAchievementCards();`
 *
 * 6) Add a new achievement:
 *    - add its id to `AchievementId`
 *    - add its definition in `achievementDefinitions`
 *    - add a linked function entry in `achievementUnlockers`
 *    Then call that unlock function wherever your feature/event should award it.
 */
export type AchievementId =
| 'firstInsult'
| 'insults1000'
| 'insults10000'
| 'insults100000'
| 'insults1000000'
| 'hedgehogEggFound'
| 'shareTheHate'
| 'topThree'
| 'firstPlace';

export interface AchievementDefinition {
	id: AchievementId;
	title: string;
	description: string;
	emoji: string;
	kind: 'insultsSeen' | 'hedgehogEgg' | 'sharing' | 'leaderboardRank';
	requiredInsultsSeen?: number;
}

export interface EarnedAchievement extends AchievementDefinition {
	unlockedAt: string;
}

export interface AchievementCard extends AchievementDefinition {
	earned: boolean;
	unlockedAt: string | null;
}

const achievementDefinitions: AchievementDefinition[] = [
	{
		id: 'firstInsult',
		title: 'First Blood',
		description: 'Generate your first insult.',
		emoji: '🔥',
		kind: 'insultsSeen',
		requiredInsultsSeen: 1
	},
	{
		id: 'insults1000',
		title: 'Roast Regular',
		description: 'Generate 1,000 insults.',
		emoji: '💯',
		kind: 'insultsSeen',
		requiredInsultsSeen: 1000
	},
	{
		id: 'insults10000',
		title: 'Low Life',
		description: 'Generate 10,000 insults.',
		emoji: '👹',
		kind: 'insultsSeen',
		requiredInsultsSeen: 10000
	},
	{
		id: 'insults100000',
		title: 'Disparagement Demi-God',
		description: 'Generate 100,000 insults.',
		emoji: '🌋',
		kind: 'insultsSeen',
		requiredInsultsSeen: 100000
	},
	{
		id: 'insults1000000',
		title: 'Ego Death',
		description: 'Generate 1,000,000 insults.',
		emoji: '💀',
		kind: 'insultsSeen',
		requiredInsultsSeen: 1000000
	},
	{
		id: 'hedgehogEggFound',
		title: 'Hog Hunter',
		description: 'Find the hidden hedgehog easter egg.',
		emoji: '🦔',
		kind: 'hedgehogEgg'
	},
	{
		id: 'shareTheHate',
		title: 'Share the Hate',
		description: 'Share an insult on social media.',
		emoji: '📢',
		kind: 'sharing'
	},
	{
		id: 'topThree',
		title: 'Top Three Terror',
		description: 'Reach the top 3 on the leaderboard.',
		emoji: '🏆',
		kind: 'leaderboardRank'
	},
	{
		id: 'firstPlace',
		title: 'Supreme Leader of (de)Motivation',
		description: 'Claim 1st place on the leaderboard.',
		emoji: '👑',
		kind: 'leaderboardRank'
	}
];

const achievementDefinitionMap = new Map(achievementDefinitions.map((achievementDefinition) => [
	achievementDefinition.id,
	achievementDefinition
]));

const insultMilestoneCounts = new Set(
	achievementDefinitions
		.filter((achievementDefinition) => achievementDefinition.kind === 'insultsSeen')
		.map((achievementDefinition) => Number(achievementDefinition.requiredInsultsSeen ?? 0))
);

const normalizeUnlockMap = (value: unknown): Partial<Record<AchievementId, string>> => {
	if (!value || typeof value !== 'object') {
		return {};
	}
	const source = value as Record<string, unknown>;
	const normalizedUnlockMap: Partial<Record<AchievementId, string>> = {};
	for (const [key, unlockDate] of Object.entries(source)) {
		const achievementId = key as AchievementId;
		if (
			achievementDefinitionMap.has(achievementId)
			&& typeof unlockDate === 'string'
			&& unlockDate.length > 0
		) {
			normalizedUnlockMap[achievementId] = unlockDate;
		}
	}
	return normalizedUnlockMap;
};

const getAchievementAuthState = async () => {
	const [{ getAuth }, { getFirebaseApp }] = await Promise.all([
		import('firebase/auth'),
		import('./firebase/firebaseApp')
	]);
	const app = await getFirebaseApp();
	const auth = getAuth(app);
	await auth.authStateReady();
	return {
		app,
		user: auth.currentUser
	};
};

const unlockAchievementsById = async (achievementIds: AchievementId[]): Promise<AchievementId[]> => {
	const { getFirestore, doc, getDoc, setDoc } = await import('firebase/firestore');
	const { app, user } = await getAchievementAuthState();
	if (!user) {
		console.warn('unlockAchievementsById: No authenticated user, skipping database write');
		return [];
	}
	const userRef = doc(getFirestore(app), 'users', user.uid);
	const userSnapshot = await getDoc(userRef);
	const currentUnlockMap = normalizeUnlockMap(userSnapshot.data()?.achievements);
	const nextUnlockMap = { ...currentUnlockMap };
	const unlockedNow: AchievementId[] = [];
	const unlockedAt = new Date().toISOString();
	for (const achievementId of achievementIds) {
		if (!achievementDefinitionMap.has(achievementId)) {
			continue;
		}
		if (!nextUnlockMap[achievementId]) {
			nextUnlockMap[achievementId] = unlockedAt;
			unlockedNow.push(achievementId);
		}
	}
	if (unlockedNow.length === 0) {
		return [];
	}
	await setDoc(
		userRef,
		{
			achievements: nextUnlockMap
		},
		{ merge: true }
	);
	return unlockedNow;
};

/**
 * How to use:
 * 1) Unlock a single achievement from anywhere:
 *    `await achievementUnlockers.hedgehogEggFound();`
 * 2) Build a custom unlock function and place it where you want:
 *    `const unlockMyAchievement = createAchievementUnlocker('firstInsult');`
 *    `await unlockMyAchievement();`
 * 3) Add a new achievement:
 *    - add it to `achievementDefinitions`
 *    - add it to `AchievementId`
 *    - add an entry to `achievementUnlockers`
 * 4) For insult milestones, call `syncMilestoneAchievements(currentInsultCount)`.
 */
export const createAchievementUnlocker = (achievementId: AchievementId) => {
	return () => unlockAchievementsById([achievementId]);
};

/**
 * Pre-linked unlock functions you can import anywhere in the app.
 * Example: `await achievementUnlockers.firstInsult();`
 */
export const achievementUnlockers: Record<AchievementId, () => Promise<AchievementId[]>> = {
	firstInsult: createAchievementUnlocker('firstInsult'),
	insults1000: createAchievementUnlocker('insults1000'),
	insults10000: createAchievementUnlocker('insults10000'),
	insults100000: createAchievementUnlocker('insults100000'),
	insults1000000: createAchievementUnlocker('insults1000000'),
	hedgehogEggFound: createAchievementUnlocker('hedgehogEggFound'),
	shareTheHate: createAchievementUnlocker('shareTheHate'),
	topThree: createAchievementUnlocker('topThree'),
	firstPlace: createAchievementUnlocker('firstPlace')
};

export const getAchievementDefinitions = (): AchievementDefinition[] => achievementDefinitions;

export const isInsultMilestoneCount = (insultsSeen: number): boolean => insultMilestoneCounts.has(insultsSeen);

/**
 * Retroactive + normal milestone sync.
 * Pass any total insult count and this will unlock all matching milestones.
 */
export const syncMilestoneAchievements = (insultsSeen: number): Promise<AchievementId[]> => {
	const unlockedAchievementIds: AchievementId[] = achievementDefinitions
		.filter((achievementDefinition) => (
			achievementDefinition.kind === 'insultsSeen'
&& insultsSeen >= Number(achievementDefinition.requiredInsultsSeen ?? Number.MAX_SAFE_INTEGER)
		))
		.map((achievementDefinition) => achievementDefinition.id);
	return unlockAchievementsById(unlockedAchievementIds);
};

export const syncLeaderboardRankAchievements = (rank: number | null): Promise<AchievementId[]> => {
	if (typeof rank !== 'number' || !Number.isFinite(rank) || rank < 1) {
		return Promise.resolve([]);
	}
	const unlockedAchievementIds: AchievementId[] = [];
	if (rank <= 3) {
		unlockedAchievementIds.push('topThree');
	}
	if (rank === 1) {
		unlockedAchievementIds.push('firstPlace');
	}
	return unlockAchievementsById(unlockedAchievementIds);
};

export const unlockHedgehogAchievement = (): Promise<AchievementId[]> => achievementUnlockers.hedgehogEggFound();

export const readEarnedAchievements = async (): Promise<EarnedAchievement[]> => {
	const { getFirestore, doc, getDoc } = await import('firebase/firestore');
	const { app, user } = await getAchievementAuthState();
	if (!user) {
		return [];
	}
	const userRef = doc(getFirestore(app), 'users', user.uid);
	const userSnapshot = await getDoc(userRef);
	const unlockMap = normalizeUnlockMap(userSnapshot.data()?.achievements);
	return achievementDefinitions
		.map((achievementDefinition) => {
			const unlockedAt = unlockMap[achievementDefinition.id];
			if (!unlockedAt) {
				return null;
			}
			return {
				...achievementDefinition,
				unlockedAt
			};
		})
		.filter((achievement): achievement is EarnedAchievement => achievement !== null);
};

/**
 * UI helper: returns every achievement with earned/locked state.
 * Use this for profile views so locked items can be shown as disabled.
 */
export const readAchievementCards = async (): Promise<AchievementCard[]> => {
	const earnedAchievements = await readEarnedAchievements();
	const earnedUnlockMap = Object.fromEntries(earnedAchievements.map((achievement) => [achievement.id, achievement.unlockedAt]));
	return achievementDefinitions
		.map((achievementDefinition) => ({
			...achievementDefinition,
			earned: Boolean(earnedUnlockMap[achievementDefinition.id]),
			unlockedAt: earnedUnlockMap[achievementDefinition.id] ?? null
		}))
		.sort((leftAchievement, rightAchievement) => Number(rightAchievement.earned) - Number(leftAchievement.earned));
};
