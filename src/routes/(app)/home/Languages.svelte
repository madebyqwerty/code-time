<script lang="ts">
	import Checkbox from './Checkbox.svelte';
	import { goto, invalidate } from '$app/navigation';
	import { languageStore } from '$lib/pocketbase/languageStore';
	import { languages } from '$lib/utils/languages';

	let selectedLanguages: string[] = [];

	async function handleTagChange(id: string, checked: boolean) {
		if (checked) {
			selectedLanguages = [...selectedLanguages, id];
		} else {
			selectedLanguages = selectedLanguages.filter((e) => e !== id);
		}
		const url = new URL(window.location.href);

		url.searchParams.set('langs', JSON.stringify(selectedLanguages));

		await goto(url);
		await invalidate('home');
	}
</script>

<section>
	<h3>Jazyky</h3>
	{#each $languageStore as language}
		<div class="tag">
			<Checkbox
				{language}
				--bg={languages[language]}
				on:check={(e) => handleTagChange(language, e.detail)}
			/>{language}
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
