<script lang="ts">
	import Checkbox from './Checkbox.svelte';
	import { tagStore } from '$lib/pocketbase/tagStore';
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';

	$: tagsSearchParam = $page.url.searchParams.get('tags');
	$: selectedTags = tagsSearchParam ? JSON.parse(tagsSearchParam) : [];

	async function handleTagChange(id: string, checked: boolean) {
		if (checked) {
			$page.url.searchParams.set('tags', JSON.stringify([...selectedTags, id]));
		} else {
			$page.url.searchParams.set(
				'tags',
				JSON.stringify(selectedTags.filter((e: string) => e !== id))
			);
		}

		await goto($page.url);
		invalidate('home');
	}
</script>

<section>
	<h3>Štítky</h3>
	{#each $tagStore as tag (tag.id)}
		<div class="tag">
			<Checkbox
				active={selectedTags.includes(tag.id)}
				--bg={tag.color}
				on:check={(e) => handleTagChange(tag.id, e.detail)}
			/>{tag.name}
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
