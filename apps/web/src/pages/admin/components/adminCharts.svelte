<script lang="ts">
import { onDestroy, onMount } from 'svelte';
import type { InsultRequest } from '../../../utils/insultRequests';

interface Props {
	pendingCount: number;
	approvedCount: number;
	rejectedCount: number;
	pendingRequests: InsultRequest[];
	approvedRequests: InsultRequest[];
	rejectedRequests: InsultRequest[];
	bsTheme: 'light' | 'dark';
}

const {
	pendingCount,
	approvedCount,
	rejectedCount,
	pendingRequests,
	approvedRequests,
	rejectedRequests,
	bsTheme
}: Props = $props();

let statusChartContainer = $state<HTMLDivElement | null>(null);
let trendChartContainer = $state<HTMLDivElement | null>(null);
let statusChart = $state<import('echarts').ECharts | null>(null);
let trendChart = $state<import('echarts').ECharts | null>(null);
let echartsModule = $state<typeof import('echarts') | null>(null);

const getChartColors = () => {
	const isDark = bsTheme === 'dark';
	return {
		text: isDark ? '#E5E7EB' : '#111827',
		axis: isDark ? '#9CA3AF' : '#6B7280',
		grid: isDark ? '#374151' : '#E5E7EB',
		background: isDark ? '#111827' : '#FFFFFF'
	};
};

const buildTrendData = () => {
	const dailyCounts = new Map<string, number>();
	const dailyLabels = new Map<string, string>();
	const today = new Date();

	for (let index = 6; index >= 0; index -= 1) {
		const date = new Date(today);
		date.setHours(0, 0, 0, 0);
		date.setDate(today.getDate() - index);
		const key = date.toISOString().slice(0, 10);
		dailyCounts.set(key, 0);
		dailyLabels.set(key, date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
	}

	const allRequests = [...pendingRequests, ...approvedRequests, ...rejectedRequests];
	allRequests.forEach((request) => {
		const createdAt = new Date(request.createdAt);
		createdAt.setHours(0, 0, 0, 0);
		const key = createdAt.toISOString().slice(0, 10);
		if (dailyCounts.has(key)) {
			dailyCounts.set(key, (dailyCounts.get(key) ?? 0) + 1);
		}
	});

	const keys = [...dailyCounts.keys()];
	return {
		labels: keys.map((key) => dailyLabels.get(key) ?? key),
		values: keys.map((key) => dailyCounts.get(key) ?? 0)
	};
};

const updateCharts = () => {
	if (!statusChart || !trendChart) {
		return;
	}

	const colors = getChartColors();
	const trendData = buildTrendData();

	statusChart.setOption({
		backgroundColor: colors.background,
		textStyle: { color: colors.text },
		tooltip: { trigger: 'item' },
		legend: {
			bottom: 0,
			textStyle: { color: colors.axis }
		},
		series: [
			{
				name: 'Request Status',
				type: 'pie',
				radius: ['45%', '70%'],
				avoidLabelOverlap: false,
				label: { show: false },
				data: [
					{ value: pendingCount, name: 'Pending', itemStyle: { color: '#F59E0B' } },
					{ value: approvedCount, name: 'Approved', itemStyle: { color: '#22C55E' } },
					{ value: rejectedCount, name: 'Rejected', itemStyle: { color: '#EF4444' } }
				]
			}
		]
	});

	trendChart.setOption({
		backgroundColor: colors.background,
		textStyle: { color: colors.text },
		tooltip: { trigger: 'axis' },
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: trendData.labels,
			axisLine: { lineStyle: { color: colors.axis } },
			axisLabel: { color: colors.axis }
		},
		yAxis: {
			type: 'value',
			minInterval: 1,
			axisLine: { lineStyle: { color: colors.axis } },
			splitLine: { lineStyle: { color: colors.grid } },
			axisLabel: { color: colors.axis }
		},
		series: [
			{
				name: 'Requests',
				type: 'bar',
				data: trendData.values,
				itemStyle: { color: '#7C3AED' },
				barMaxWidth: 36
			}
		]
	});
};

const handleResize = () => {
	statusChart?.resize();
	trendChart?.resize();
};

onMount(async () => {
	if (!statusChartContainer || !trendChartContainer) {
		return;
	}

	echartsModule = await import('echarts');
	statusChart = echartsModule.init(statusChartContainer);
	trendChart = echartsModule.init(trendChartContainer);
	updateCharts();
	window.addEventListener('resize', handleResize);
});

onDestroy(() => {
	window.removeEventListener('resize', handleResize);
	statusChart?.dispose();
	trendChart?.dispose();
	statusChart = null;
	trendChart = null;
	echartsModule = null;
});

$effect(() => {
	if (!statusChart || !trendChart) {
		return;
	}

	pendingCount;
	approvedCount;
	rejectedCount;
	pendingRequests.length;
	approvedRequests.length;
	rejectedRequests.length;
	bsTheme;
	updateCharts();
});
</script>

<div class="row g-3 mb-4">
<div class="col-lg-6">
<div class="card border-0 shadow-sm h-100">
<div class="card-body">
<h2 class="h5 fw-semibold mb-3">Request Status Breakdown</h2>
<div bind:this={statusChartContainer} style="height: 320px;" role="img" aria-label="Pie chart showing pending, approved, and rejected request totals"></div>
</div>
</div>
</div>
<div class="col-lg-6">
<div class="card border-0 shadow-sm h-100">
<div class="card-body">
<h2 class="h5 fw-semibold mb-3">Last 7 Days of Requests</h2>
<div bind:this={trendChartContainer} style="height: 320px;" role="img" aria-label="Bar chart showing daily request counts for the last seven days"></div>
</div>
</div>
</div>
</div>
