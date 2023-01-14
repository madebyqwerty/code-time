<script lang="ts">
	import flatpickr from 'flatpickr';
	import type { Instance } from 'flatpickr/dist/types/instance';
	import { onMount } from 'svelte';
	import { Czech } from 'flatpickr/dist/l10n/cs';
	import './datepicker.css';

	let datepicker: Instance;

	onMount(() => {
		datepicker = flatpickr('.flatpickr', {
			mode: 'range',
			locale: Czech
		}) as Instance;
	});

	$: console.log(datepicker?.selectedDates);
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
