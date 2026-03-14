interface MegamodeIntervalController {
start: () => void;
stop: () => void;
}

const createMegamodeIntervalController = (
	getSpeed: () => number,
	onTick: () => void | Promise<void>
): MegamodeIntervalController => {
	let megamodeInterval: ReturnType<typeof setInterval> | null = null;

	const stop = () => {
		if (megamodeInterval !== null) {
			clearInterval(megamodeInterval as unknown as number);
			megamodeInterval = null;
		}
	};

	const start = () => {
		stop();
		const speed = Math.max(20, Number(getSpeed()) || 250);
		megamodeInterval = setInterval(() => {
			void onTick();
		}, speed);
	};

	return {
		start,
		stop
	};
};

export { createMegamodeIntervalController };
