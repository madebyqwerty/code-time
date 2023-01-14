<script lang="ts">
	import flatpickr from 'flatpickr';
	import type { Instance } from 'flatpickr/dist/types/instance';
	import { createEventDispatcher, onMount } from 'svelte';
	import { Czech } from 'flatpickr/dist/l10n/cs';
	import './datepicker.css';

	const dispatch = createEventDispatcher<{ change: Date[] }>();
	let datepicker: Instance;

	onMount(() => {
		datepicker = flatpickr('.flatpickr', {
			mode: 'range',
			locale: Czech,
			onClose: (e) => dispatch('change', e)
		}) as Instance;
	});
</script>

<input
	class="flatpickr flatpickr-input"
	type="text"
	placeholder="Vyber rozmezí"
	data-id="range"
	readonly={true}
/>

<style lang="scss">
	input {
		background-color: $background;
		color: $green-lightest;
		padding: 0.4rem;
		border: solid 1px $green-primary;
	}
</style>
