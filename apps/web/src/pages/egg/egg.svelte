<script lang="ts">
	import { onDestroy } from 'svelte';
	import hedgehogSrc from '../../img/HedgehogIcon.png';
    import { randomInRange } from '@porkyproductions/hat';
    import { deviceType } from '../../utils/uaStub';
	import { achievementUnlockers } from '../../utils/achievements';

	let canvas = $state<HTMLCanvasElement | undefined>(undefined);
	let animId: number | undefined;

	interface Hog { x: number; y: number; vx: number; vy: number; rot: number; rotV: number };

	let hogCount = randomInRange(1, 55);
	if (deviceType === 'mobile') {
		hogCount = Math.floor(hogCount / 7);
	}
	const hogRadius = 110 - hogCount * 0.8;

	achievementUnlockers.hedgehogEggFound();

	const initCanvas = () => {
		if (!canvas) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const hogs: Hog[] = [];
		for (let i = 0; i < hogCount; i++) {
			hogs.push({
				x: hogRadius + Math.random() * (canvas.width - hogRadius * 2),
				y: hogRadius + Math.random() * (canvas.height - hogRadius * 2),
				vx: (Math.random() - 0.5) * 4,
				vy: (Math.random() - 0.5) * 4,
				rot: Math.random() * Math.PI,
				rotV: (Math.random() < 0.5 ? 1 : -1) * (0.015 + Math.random() * 0.045)
			});
		}

		// Ensure no hog starts completely still
		for (const h of hogs) {
			const speed = Math.sqrt(h.vx * h.vx + h.vy * h.vy);
			if (speed < 1) {
				const angle = Math.random() * Math.PI * 2;
				h.vx = Math.cos(angle) * 2;
				h.vy = Math.sin(angle) * 2;
			}
		}

		const img = new Image();
		img.src = hedgehogSrc;

		const tick = async () => {
			const darkMode = await import('../../utils/darkMode');
			if (!canvas) return;
			const ctx = canvas.getContext('2d');
			if (!ctx) return;

			ctx.fillStyle = '#FFFFFF';
			if (darkMode) {
				ctx.fillStyle = '#000000';
			}
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			for (let i = 0; i < hogs.length; i++) {
				const h = hogs[i];
				h.x += h.vx;
				h.y += h.vy;
				h.rot += h.rotV;

				if (h.x - hogRadius < 0) { h.x = hogRadius; h.vx = Math.abs(h.vx); }
				if (h.x + hogRadius > canvas.width) { h.x = canvas.width - hogRadius; h.vx = -Math.abs(h.vx); }
				if (h.y - hogRadius < 0) { h.y = hogRadius; h.vy = Math.abs(h.vy); }
				if (h.y + hogRadius > canvas.height) { h.y = canvas.height - hogRadius; h.vy = -Math.abs(h.vy); }

				for (let j = i + 1; j < hogs.length; j++) {
					const h2 = hogs[j];
					const dx = h2.x - h.x;
					const dy = h2.y - h.y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					const minDist = hogRadius * 2;
					if (dist < minDist && dist > 0) {
						const nx = dx / dist;
						const ny = dy / dist;
						const overlap = (minDist - dist) / 2;
						h.x -= nx * overlap;
						h.y -= ny * overlap;
						h2.x += nx * overlap;
						h2.y += ny * overlap;
						const dvx = h.vx - h2.vx;
						const dvy = h.vy - h2.vy;
						const dot = dvx * nx + dvy * ny;
						h.vx -= dot * nx;
						h.vy -= dot * ny;
						h2.vx += dot * nx;
						h2.vy += dot * ny;
					}
				}

				ctx.save();
				ctx.translate(h.x, h.y);
				ctx.rotate(h.rot);
				ctx.beginPath();
				ctx.arc(0, 0, hogRadius, 0, Math.PI * 2);
				ctx.clip();
				ctx.drawImage(img, -hogRadius, -hogRadius, hogRadius * 2, hogRadius * 2);
				ctx.restore();
			}

			animId = requestAnimationFrame(tick);
		};

		img.onload = () => { animId = requestAnimationFrame(tick); };
		if (img.complete) animId = requestAnimationFrame(tick);
	};

	$effect(() => {
		if (canvas) {
			initCanvas();
			return () => {
				if (animId !== undefined) cancelAnimationFrame(animId);
			};
		}
		else return;
	});

	onDestroy(() => {
		if (animId !== undefined) cancelAnimationFrame(animId);
	});
</script>

<div id="root">
	<canvas
		bind:this={canvas}
		style="display: block; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;"
	></canvas>
</div>

<style>
	:global(body), :global(html) {
		height: 100%;
		margin: 0;
		overflow: hidden;
	}
</style>
