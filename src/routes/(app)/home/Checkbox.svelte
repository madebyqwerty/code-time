<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';

	const dispatch = createEventDispatcher<{ check: boolean }>();

	export let active: boolean = false;
	let checked = false;
	onMount(() => {
		checked = active;
	});
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
