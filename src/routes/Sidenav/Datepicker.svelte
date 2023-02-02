<script lang="ts">
	import flatpickr from 'flatpickr';
	import type { Instance } from 'flatpickr/dist/types/instance';
	import { createEventDispatcher, onMount } from 'svelte';
	import { Czech } from 'flatpickr/dist/l10n/cs';
	import './datepicker.css';
	import { goto, invalidate } from '$app/navigation';
	import { subtractMonth } from '$lib/utils/subtractMonth';
	import { page } from '$app/stores';
	import { getDateFromString } from '$lib/utils/getDateFromString';

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

	let datePast = getDateFromString($page.url.searchParams.get('from'));
	let dateEnd = getDateFromString($page.url.searchParams.get('to'));
	datePast ||= subtractMonth(new Date(), 1);
	dateEnd ||= new Date();

	onMount(() => {
		datepicker = flatpickr('.flatpickr', {
			mode: 'range',
			locale: Czech,
			onClose: (e) => handleDateChange(e),
			defaultDate: [datePast, dateEnd]
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
		readonly={true} />
</section>

<style lang="scss">
	section {
		@include nav-section;
	}

	input {
		background-color: lighten($background, 10);
		color: $green-lightest;
		padding: 0.4rem;
		padding: 0.8rem;
	}
</style>
