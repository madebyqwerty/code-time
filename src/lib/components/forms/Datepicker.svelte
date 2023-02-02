<script lang="ts">
	import flatpickr from 'flatpickr';
	import { Czech } from 'flatpickr/dist/l10n/cs';
	import type { Instance } from 'flatpickr/dist/types/instance';
	import { onMount } from 'svelte';

	let datepicker;

	export let value: Date;

	onMount(() => {
		datepicker = flatpickr('.flatpickr-create', {
			mode: 'single',
			locale: Czech,
			onClose: (e) => (value = e[0]),
			defaultDate: new Date()
		}) as Instance;
	});
</script>

<input
	class="flatpickr-create flatpickr-input"
	id="datepicker"
	type="text"
	placeholder="Vyber datum"
	data-id="range"
	readonly={true} />

<style lang="scss">
	input {
		color: $green-lightest;
		border: 1px solid $green-primary;
		background: transparent;
		padding: 0.8rem;
		display: block;
		width: 100%;
	}
</style>
