import { randomInRange } from '@porkyproductions/hat/randomInRange';

// @ts-ignore - canvas-confetti doesn't have type definitions
import confetti from 'canvas-confetti';

// Launch confetti animation
export const launchConfetti = async () => {
	let i = 3;
	const interval = setInterval(() => {
		if (i <= 0) clearInterval(interval);
		confetti({
			angle: randomInRange(50, 90),
			spread: randomInRange(25, 100),
			particleCount: randomInRange(20, 50),
			origin: { y: 0.6 }
		});
		i--;
	}, 500);
};

// Login handler
export const createLoginHandler = (
	deviceType: string,
	setReady: (ready: boolean) => void,
	setError: (error: any) => void
) => async (event: Event, loginAction: (email: string, password: string) => Promise<any>, email: string, password: string, keepMeLoggedIn: boolean) => {
	event.preventDefault();

	if (deviceType === 'desktop') {
		setReady(false);
	}

	try {
		setError(null);

		// Use the function passed from the component
		await loginAction(email, password);

		confetti({
			angle: randomInRange(55, 125),
			spread: randomInRange(50, 70),
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
		setError(err);
		setReady(true);
	}
};
