export async function importCapacitor(pkg: string): Promise<any | null> {
	try {
		// dynamic import; if package is removed, this will throw and we return null
		// @vite-ignore tells Vite not to try to pre-bundle this dynamic specifier
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const mod = await import(/* @vite-ignore */ pkg);
		return mod;
	} catch (err) {
		console.warn(`Capacitor package ${pkg} not available`, err);
		return null;
	}
}
