interface InsultStreakData {
	insultStreak: number;
	lastInsultSeenDate: string | null;
}

const defaultInsultStreakData: InsultStreakData = {
	insultStreak: 0,
	lastInsultSeenDate: null
};

const getFirebaseApp = async () => {
	const { getApps, getApp, initializeApp } = await import('firebase/app');
	const { firebaseConfig } = await import('../typescript/insults');
	return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
};

const toLocalDayKey = (date: Date): string => {
	const year = date.getFullYear();
	const month = `${date.getMonth() + 1}`.padStart(2, '0');
	const day = `${date.getDate()}`.padStart(2, '0');
	return `${year}-${month}-${day}`;
};

const parsePositiveInteger = (value: unknown): number => {
	const parsed = Math.floor(Number(value));
	if (!Number.isFinite(parsed) || parsed < 0) {
		return 0;
	}
	return parsed;
};

const parseDayKey = (value: unknown): string | null => {
	if (typeof value !== 'string') {
		return null;
	}
	if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
		return null;
	}
	return value;
};

const sanitizeInsultStreakData = (value: unknown): InsultStreakData => {
	if (!value || typeof value !== 'object') {
		return { ...defaultInsultStreakData };
	}
	const source = value as Record<string, unknown>;
	return {
		insultStreak: parsePositiveInteger(source.insultStreak),
		lastInsultSeenDate: parseDayKey(source.lastInsultSeenDate)
	};
};

const addDaysToDayKey = (dayKey: string, dayCount: number): string | null => {
	const dayParts = dayKey.split('-').map((part) => Number.parseInt(part, 10));
	if (dayParts.length !== 3 || dayParts.some((part) => !Number.isFinite(part))) {
		return null;
	}
	const [year, month, day] = dayParts;
	const date = new Date(year, month - 1, day);
	date.setDate(date.getDate() + dayCount);
	return toLocalDayKey(date);
};

const resolveNextInsultStreakData = (currentData: InsultStreakData, today: string): InsultStreakData => {
	const previousDay = currentData.lastInsultSeenDate;
	if (previousDay === today) {
		return {
			insultStreak: Math.max(currentData.insultStreak, 1),
			lastInsultSeenDate: today
		};
	}
	const nextDayAfterPrevious = previousDay ? addDaysToDayKey(previousDay, 1) : null;
	if (nextDayAfterPrevious === today) {
		return {
			insultStreak: currentData.insultStreak + 1,
			lastInsultSeenDate: today
		};
	}
	return {
		insultStreak: 1,
		lastInsultSeenDate: today
	};
};

export const readInsultStreak = async (): Promise<number> => {
	const { getFirestore, doc, getDoc } = await import('firebase/firestore');
	const { getAuth } = await import('firebase/auth');
	const app = await getFirebaseApp();
	const db = getFirestore(app);
	const auth = getAuth(app);
	const user = auth.currentUser;
	if (!user) {
		return 0;
	}
	const userRef = doc(db, 'users', user.uid);
	const userSnap = await getDoc(userRef);
	if (!userSnap.exists()) {
		return 0;
	}
	const userData = sanitizeInsultStreakData(userSnap.data());
	return userData.insultStreak;
};

export const updateDailyInsultStreak = async (): Promise<number> => {
	const { getFirestore, doc, runTransaction } = await import('firebase/firestore');
	const { getAuth } = await import('firebase/auth');
	const app = await getFirebaseApp();
	const db = getFirestore(app);
	const auth = getAuth(app);
	const user = auth.currentUser;
	if (!user) {
		console.warn('updateDailyInsultStreak: No authenticated user, skipping database write');
		return 0;
	}
	const userRef = doc(db, 'users', user.uid);
	const today = toLocalDayKey(new Date());
	const nextStreak = await runTransaction(db, async (transaction) => {
		const userSnap = await transaction.get(userRef);
		const currentData = userSnap.exists()
			? sanitizeInsultStreakData(userSnap.data())
			: { ...defaultInsultStreakData };
		const nextData = resolveNextInsultStreakData(currentData, today);
		const hasChanges = nextData.insultStreak !== currentData.insultStreak
			|| nextData.lastInsultSeenDate !== currentData.lastInsultSeenDate;
		if (hasChanges) {
			transaction.set(
				userRef,
				{
					insultStreak: nextData.insultStreak,
					lastInsultSeenDate: nextData.lastInsultSeenDate
				},
				{ merge: true }
			);
		}
		return nextData.insultStreak;
	});
	return nextStreak;
};
