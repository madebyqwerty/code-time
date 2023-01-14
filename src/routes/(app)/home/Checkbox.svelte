<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ check: boolean }>();

	let checked: boolean;

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
