<script>
	import Number from '$lib/components/forms/Number.svelte';
	import { page } from '$app/stores';

	let from = 0;
	let to = 60;

	function handleNumberChange() {
		const url = $page.url;

		url.searchParams.set('fromLength', `${from}`);
		url.searchParams.set('toLength', `${to}`);
	}
</script>

<div class="section">
	<h3>Časový interval</h3>
	<Number
		bind:value={from}
		min={0}
		max={to}
		step={5}
		id="from"
		label="Od"
		on:change={handleNumberChange} />
	<Number
		bind:value={to}
		min={from}
		max={10000}
		step={5}
		id="to"
		label="Do"
		on:change={handleNumberChange} />
</div>
