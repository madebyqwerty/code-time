<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import Checkbox from './Checkbox.svelte';

	const starsArr = ['*', '**', '***', '****', '*****'];

	let stars: number[];
	$: starsParam = $page.url.searchParams.get('stars');
	$: stars = starsParam ? JSON.parse(starsParam) : [];

	const handleStarsChange = async (starCount: number, checked: boolean) => {
		const url = new URL(window.location.href);
		if (checked) {
			url.searchParams.set('stars', JSON.stringify([...stars, starCount]));
		} else {
			url.searchParams.set('stars', JSON.stringify(stars.filter((star) => star !== starCount)));
		}

		console.log('stars');
		await goto(url);
	};
</script>

<section>
	<h3>Obtížnost</h3>
	{#each starsArr as star, starIndex}
		<div class="checkbox-wrapper">
			<Checkbox
				active={stars.includes(starsArr.indexOf(star))}
				--bg="#fff"
				on:check={(e) => handleStarsChange(starIndex, e.detail)}
			/>
			<div class="star">{star}</div>
		</div>
	{/each}
</section>

<style>
	.star {
		font-family: 'Silkscreen', monospace;
	}

	.checkbox-wrapper {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}
</style>
