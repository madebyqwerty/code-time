<script lang="ts">
	import Checkbox from './Checkbox.svelte';
	import { goto, invalidate } from '$app/navigation';
	import { languageStore } from '$lib/pocketbase/languageStore';
	import { languageNames, languageColors } from '$lib/utils/languages';
	import { page } from '$app/stores';

	$: langsSearchParam = $page.url.searchParams.get('langs');
	$: selectedLanguages = langsSearchParam !== null ? JSON.parse(langsSearchParam) : [];
	async function handleTagChange(id: string, checked: boolean) {
		if (checked) {
			$page.url.searchParams.set('langs', JSON.stringify([...selectedLanguages, id]));
		} else {
			$page.url.searchParams.set(
				'langs',
				JSON.stringify(selectedLanguages.filter((e: string) => e !== id))
			);
		}

		await goto($page.url.toString());
		await invalidate('home');
	}
</script>

<section>
	<h3>Jazyky</h3>
	{#each $languageStore as language (language)}
		<div class="tag">
			<Checkbox
				active={selectedLanguages.includes(language)}
				--bg={languageColors[language]}
				on:check={(e) => handleTagChange(language, e.detail)}
			/>
			{languageNames[language]}
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
