<script lang="ts">
	import type { RecordsLanguageOptions } from '$lib/pocketbase/types';
	import { languageColors, languageNames } from '$lib/utils/languages';

	export let dataLanguages: Record<string, number>;
	export let dataLanguagesTotal: number;

	let percentage: [string, number][] = [];

	console.log(dataLanguages);

	Object.entries(dataLanguages).forEach(([name, count]) => {
		percentage.push([name, (count / dataLanguagesTotal) * 100]);
	});

	percentage = percentage.sort((a, b) => b[1] - a[1]);

	console.log(percentage);

	let totalPercentage = 0;
	let gradient = '';
	let topColor;

	percentage.forEach(([name, count], i) => {
		gradient += `${languageColors[name as RecordsLanguageOptions]} ${
			i === 0 ? (percentage.length === 1 ? '0%' : '') : `${percentage.at(i - 1)[1]}%`
		} ${totalPercentage + count}%${percentage.length !== i + 1 ? ',' : ''}`;

		console.log(totalPercentage, count, totalPercentage + count);
		totalPercentage += count;
		if (i === 0) {
			topColor = languageColors[name as RecordsLanguageOptions];
		}
	});
</script>

<div class="chart-wrapper">
	<div class="chart" style="--background:linear-gradient(to right, {gradient})" />
	<div class="language-wrapper">
		{#each percentage as [language, percent]}
			<div class="language">
				<div class="square" style="background-color: {languageColors[language]}" />
				<span>{languageNames[language]} <span class="percent">{percent.toFixed(1)}%</span></span>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.chart-wrapper {
		background-color: $background-light;
		padding: 1.2rem;
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
		animation: grow 0.75s forwards;
	}

	.chart {
		background: var(--background);
		height: 1.2rem;
	}

	.square {
		height: 10px;
		width: 10px;
	}

	.language-wrapper {
		display: flex;
		gap: 1.2rem;
		flex-wrap: wrap;
	}

	.language {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.percent {
		color: white;
	}
</style>
