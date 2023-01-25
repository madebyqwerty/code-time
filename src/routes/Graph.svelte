<script lang="ts">
	import { recordsStore } from '$lib/pocketbase/recordsStore';
	import { scaleLinear } from 'd3-scale';
	import { onMount } from 'svelte';
	import Bar from './Bar.svelte';

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
	const data: Record<number, number> = {
		0: 0,
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
		6: 0
	};

	$recordsStore
		.map((record) => odAmerifikovatZkurvenejAmerickejStandard(record.date.getDay()))
		.forEach((date) => {
			data[date] ||= 0;
			data[date] += 1;
			if (data[date] > max) {
				max = data[date];
			}
		});

	let yScale: (arg0: number) => any;
	let mounted = false;
	onMount(() => {
		yScale = scaleLinear()
			.domain([0, max])
			.range([0, height - 16 - 42]);
		mounted = true;
	});
</script>

<section>
	<h2>Graf</h2>
	<div class="graph" bind:clientWidth={width} bind:clientHeight={height}>
		{#if mounted}
			{#each Object.entries(data) as recordsCount}
				<div class="bar-wrapper">
					<Bar --bar-height={`${yScale(recordsCount[1])}px`} count={recordsCount[1]} />
					<span>{days[parseInt(recordsCount[0])]}</span>
				</div>
			{/each}
		{/if}
	</div>
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
	}
</style>
