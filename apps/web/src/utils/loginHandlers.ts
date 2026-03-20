import { randomInRange } from '@porkyproductions/hat/randomInRange';

// @ts-expect-error - canvas-confetti doesn't have type definitions
import confetti from 'canvas-confetti';

// Launch confetti animation
export const launchConfetti = () => {
	let i = 3;
	const interval = setInterval(() => {
		if (i <= 0) clearInterval(interval);
		confetti({
			angle: randomInRange(50, 90),
			spread: randomInRange(25, 100),
			particleCount: randomInRange(20, 50),
			origin: { y: 0.6 },
			colors: [
				'#4f46e5',
				'#F75C03',
				'#DABFFF',
				'#ef4444',
				'#f97316',
				'#fbbf24',
				'#84cc16',
				'#22c55e',
				'#14b8a6',
				'#06b6d4',
				'#0ea5e9',
				'#3b82f6',
				'#6366f1',
				'#a855f7',
				'#ec4899'
			]
		});
		i--;
	}, 100);
};

// Login handler
export const createLoginHandler = (
	deviceType: string,
	setReady: (ready: boolean) => void,
	setError: (error: Error | null) => void
) => async (
	event: Event,
	loginAction: (email: string, password: string) => Promise<unknown>,
	email: string,
	password: string,
	keepMeLoggedIn: boolean
) => {
	event.preventDefault();

	if (deviceType === 'desktop') {
		setReady(false);
	}

	try {
		setError(null);

		// Use the function passed from the component
		await loginAction(email, password);

		confetti({
			particleCount: randomInRange(50, 100),
			origin: { y: 0.6 }
		});

		if (keepMeLoggedIn) {
			window.localStorage.setItem('keepMeLoggedIn', 'true');
		} else {
			window.localStorage.setItem('keepMeLoggedIn', 'false');
		}

		setTimeout(() => setReady(true), 1000);
	} catch (err) {
		const normalizedError = err instanceof Error ? err : new Error(String(err));
		setError(normalizedError);
		setReady(true);
	}
};
