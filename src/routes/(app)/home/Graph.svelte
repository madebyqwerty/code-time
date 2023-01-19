<script lang="ts">
	import { recordsStore } from '$lib/pocketbase/recordsStore';
	import { scaleLinear } from 'd3-scale';
	import { onMount } from 'svelte';

	const days = ['Pondělí', 'Úterý', 'Středa', 'Čtvrek', 'Pátek', 'Sobota', 'Neděle'];

	let width: number, height: number;
	let max = 0;
	const data: Record<number, number> = {};

	$recordsStore
		.map((record) => record.date.getDay())
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

	console.log(data);
</script>

<section>
	<h1>Graf</h1>
	<div class="graph" bind:clientWidth={width} bind:clientHeight={height}>
		{#if mounted}
			{#each Object.keys(data) as dateString, i}
				<div class="bar-wrapper">
					<div class="bar" style="height: {yScale(data[parseInt(dateString)])}px;" />
					<span>{days[i]}</span>
				</div>
			{/each}
		{/if}
	</div>
</section>

<style lang="scss">
	.bar {
		width: 100%;
		background-color: $green-primary;
	}

	section {
		width: 100%;
	}

	.bar-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
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
