<script lang="ts">
	import flatpickr from 'flatpickr';
	import type { Instance } from 'flatpickr/dist/types/instance';
	import { createEventDispatcher, onMount } from 'svelte';
	import { Czech } from 'flatpickr/dist/l10n/cs';
	import './datepicker.css';
	import { goto, invalidate } from '$app/navigation';

	let datepicker: Instance;

	async function handleDateChange(dates: Date[]) {
		if (dates.length > 0) {
			const url = new URL(window.location.href);
			url.searchParams.set('from', dates[0].toISOString());
			url.searchParams.set('to', dates[1].toISOString());

			await goto(url.toString());
			await invalidate('home');
		}
	}

	onMount(() => {
		datepicker = flatpickr('.flatpickr', {
			mode: 'range',
			locale: Czech,
			onClose: (e) => handleDateChange(e)
		}) as Instance;
	});
</script>

<section>
	<h3>Od kdy do kdy</h3>
	<input
		class="flatpickr flatpickr-input"
		type="text"
		placeholder="Vyber rozmezí"
		data-id="range"
		readonly={true}
	/>
</section>

<style lang="scss">
	section {
		@include nav-section;
	}

	input {
		background-color: $background;
		color: $green-lightest;
		padding: 0.4rem;
		border: solid 1px $green-primary;
		padding: 0.8rem;
	}
</style>
