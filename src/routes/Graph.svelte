<script lang="ts">
	import Number from '$lib/components/forms/Number.svelte';
	import { recordsStore } from '$lib/pocketbase/recordsStore';
	import type { RecordsLanguageOptions } from '$lib/pocketbase/types';
	import { scaleLinear } from 'd3-scale';
	import { onMount } from 'svelte';
	import Bar from './Bar.svelte';
	import Chart from './Chart.svelte';

	// Funkce změní dny tak aby začínali na ponděli místo neděle jako v pojebaným USA
	function odAmerifikovatZkurvenejAmerickejStandard(num: number) {
		if (num == 0) {
			return 6;
		}
		return num - 1;
	}

	const days = ['Pondělí', 'Úterý', 'Středa', 'Čtvrek', 'Pátek', 'Sobota', 'Neděle'];

	let width: number, height: number;
	let max = 1;
	const dataLength: Record<number, number> = {
		0: 0,
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
		6: 0
	};

	const dataDays: Record<number, number> = {
		0: 0,
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
		6: 0
	};

	const dataLanguages: Record<number, Record<string, number>> = {
		0: {},
		1: {},
		2: {},
		3: {},
		4: {},
		5: {},
		6: {}
	};

	const dataLanguagesTotal: Record<number, number> = {
		0: 0,
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
		6: 0
	};

	let totalDataLanguages: Record<string, number> = {};

	const totalLanguages: Record<string, number> = {};

	let langsTotal = 0;

	$recordsStore
		.map((record) => {
			return {
				date: odAmerifikovatZkurvenejAmerickejStandard(record.date.getDay()),
				length: record.length,
				languages: record.language
			};
		})
		.forEach(({ date, length, languages }) => {
			dataLength[date] += length;
			dataDays[date] += 1;
			if (dataLength[date] > max) {
				max = dataLength[date];
			}

			languages.forEach((lang) => {
				dataLanguages[date][lang] ||= 0;
				dataLanguages[date][lang] += 1;
				dataLanguagesTotal[date] += 1;
				totalDataLanguages[lang] ||= 0;
				totalDataLanguages[lang] += 1;
				totalLanguages[lang] ||= 0;
				totalLanguages[lang] += 1;
				langsTotal++;
			});
		});

	let yScale: (arg0: number) => any;
	let mounted = false;
	onMount(() => {
		yScale = scaleLinear()
			.domain([0, max])
			.range([0, height - 16 - 42]);
		mounted = true;
	});

	let totalDataLanguagesTotal = totalDataLanguages;
	let totalLangsTotal = langsTotal;
</script>

<section>
	<h2>Graf</h2>
	<div class="graph" bind:clientWidth={width} bind:clientHeight={height}>
		{#if mounted}
			{#each Object.entries(dataLength) as recordsCount}
				<div class="bar-wrapper">
					<Bar
						--bar-height={`${yScale(recordsCount[1])}px`}
						daysCount={dataDays[parseInt(recordsCount[0])]}
						lengthCount={recordsCount[1]}
						dataLanguages={dataLanguages[parseInt(recordsCount[0])]}
						dataLanguagesTotal={dataLanguagesTotal[parseInt(recordsCount[0])]} />
					<span>{days[parseInt(recordsCount[0])]}</span>
				</div>
			{/each}
		{/if}
	</div>

	{#key totalDataLanguagesTotal}
		<Chart dataLanguages={totalDataLanguagesTotal} dataLanguagesTotal={totalLangsTotal} />
	{/key}
</section>

<style lang="scss">
	section {
		width: 100%;
	}

	.bar-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-items: end;
	}

	.graph {
		display: grid;
		grid-template-columns: repeat(7, minmax(0, 1fr));
		gap: 3.2rem;
		align-items: end;
		background: lighten($background, 10);
		padding-left: 3.2rem;
		padding-right: 3.2rem;
		padding-top: 0.8rem;
		padding-bottom: 0.8rem;
		width: 100%;
		height: 196px;
		margin-bottom: 2.4rem;
	}
</style>
