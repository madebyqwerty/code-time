<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';

	const dispatch = createEventDispatcher<{ check: boolean }>();

	let checked: boolean;
	export let language = '';

	const langs: string[] = JSON.parse($page.url.searchParams.get('langs') as string);

	if (langs) {
		console.log(langs);
		checked = langs.includes(language);
	}

	$: {
		if (checked) {
			dispatch('check', true);
		} else {
			dispatch('check', false);
		}
	}
</script>

<input type="checkbox" bind:checked />

<style lang="scss">
	input {
		appearance: none;
		width: 1.4rem;
		height: 1.4rem;
		border: 2px solid var(--bg);
		&:checked {
			background: var(--bg);
		}
	}
</style>
