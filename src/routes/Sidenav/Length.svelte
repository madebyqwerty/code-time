<script>
	import Number from '$lib/components/forms/Number.svelte';
	import { page } from '$app/stores';
	import { goto, invalidate } from '$app/navigation';

	let from = 0;
	let to = 60;

	async function handleNumberChange() {
		console.log('change');
		const url = $page.url;

		url.searchParams.set('fromLength', `${from}`);
		url.searchParams.set('toLength', `${to}`);

		await goto(url);
		await invalidate('home');
	}
	handleNumberChange();
</script>

<div class="section">
	<h3>Délka</h3>
	<div class="number-input">
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
</div>

<style>
	.number-input {
		display: flex;
		gap: 2rem;
	}
</style>
