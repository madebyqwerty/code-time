<script lang="ts">
	import Checkbox from './Checkbox.svelte';
	import { tagStore } from '$lib/pocketbase/tagStore';
	import { goto, invalidate } from '$app/navigation';

	let selectedTags: string[] = [];

	async function handleTagChange(id: string, checked: boolean) {
		if (checked) {
			selectedTags = [...selectedTags, id];
		} else {
			selectedTags = selectedTags.filter((e) => e !== id);
		}

		const url = new URL(window.location.href);

		url.searchParams.set('tags', JSON.stringify(selectedTags));

		await goto(url);
		invalidate('home');
	}
</script>

<section>
	<h3>Štítky</h3>
	{#each $tagStore as tag}
		<div class="tag">
			<Checkbox --bg={tag.color} on:check={(e) => handleTagChange(tag.id, e.detail)} />{tag.name}
		</div>
	{/each}
</section>

<style lang="scss">
	.tag {
		padding: 0.4rem;
		color: white;
		display: flex;
		gap: 0.8rem;
		align-items: center;
	}

	section {
		@include nav-section;
	}
</style>
