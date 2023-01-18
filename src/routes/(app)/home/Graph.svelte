<script lang="ts">
	import { recordsStore } from '$lib/pocketbase/recordsStore';

	const data: Record<number, number> = {};

	$: {
		$recordsStore
			.map((record) => {
				const { date } = record;
				date.setMilliseconds(0);
				date.setSeconds(0);
				date.setMinutes(0);
				date.setHours(0);
				return date.getTime();
			})
			.forEach((date) => {
				data[date] ||= 0;
				data[date] += 1;
			});
	}

	console.log(data);
</script>

<section>
	<h1>Graf</h1>
	<div class="graph">
		{#each Object.keys(data) as dateString}
			{@const date = parseInt(dateString)}
			<div class="bar" style="height: {data[date] * 5}rem" />
		{/each}
	</div>
</section>

<style lang="scss">
	.bar {
		width: 0.4rem;
		background-color: $green-primary;
	}

	.graph {
		display: flex;
		gap: 0.2rem;
		align-items: end;
		background: lighten($background, 10);
		padding: 0.8rem;
	}
</style>
