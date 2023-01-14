<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ check: boolean }>();

	let checked: boolean = false;
	export let language = '';
	export let selectedLanguages: string[] = [];

	checked = selectedLanguages.includes(language);

	$: {
		if (checked) {
			setTimeout(() => {
				dispatch('check', true);
			}, 500);
		} else {
			setTimeout(() => {
				dispatch('check', false);
			}, 500);
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
