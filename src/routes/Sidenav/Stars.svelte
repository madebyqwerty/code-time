<script lang="ts">
	import { page } from '$app/stores';
	import Checkbox from './Checkbox.svelte';

	const starsArr = ['*', '**', '***', '****', '*****'];

	$: starsParam = $page.url.searchParams.get('stars');
	$: stars = starsParam ? JSON.parse(starsParam) : [];

	const handleStarsChange = (starCount: number, checked: boolean) => {
		const url = new URL(window.location.href);
		url.searchParams.set('stars', JSON.stringify(..stars, starCount));
	};
</script>

<section>
	<h3>Obtížnost</h3>
	{#each starsArr as star}
		<Checkbox
			active={stars.includes(star)}
			--bg="#fff"
			on:check={(e) => handleStarsChange(star, e.detail)}
		/>{tag.name}
		<div class="star">{star}</div>
	{/each}
</section>

<style>
	.star {
		font-family: 'Silkscreen', monospace;
	}
</style>
