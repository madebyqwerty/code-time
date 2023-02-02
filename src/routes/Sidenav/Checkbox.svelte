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


<label>
	<input type="checkbox" bind:checked />
	<slot />
</label>
<style lang="scss">
	input {
		appearance: none  !important;
		width: 1.5rem  !important;
		height: 1.5rem  !important;
		border: 2px solid var(--bg) !important;
		&:checked {
			background: var(--bg)  !important;
		}
	}
	label{
		cursor:pointer;
		-webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
	display:flex;
	flex-direction:row;
	justify-content:center;
	align-items: center;
	gap:.8rem;
	}
</style>
