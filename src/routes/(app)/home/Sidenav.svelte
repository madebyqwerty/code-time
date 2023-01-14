<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { tagStore } from '$lib/pocketbase/tagStore';
	import Checkbox from './Checkbox.svelte';
	import Datepicker from './Datepicker.svelte';

	let isManager = false;

	console.log($tagStore);

	async function handleDateChange(e: CustomEvent<Date[]>) {
		const dates = e.detail;
		const url = new URL(window.location.href);
		url.searchParams.set('from', dates[0].toISOString());
		url.searchParams.set('to', dates[1].toISOString());

		console.log(url.toString());
		await goto(url.toString());
		await invalidate('home');
	}

	let selectedTags: string[] = [];

	function handleTagChange(id: string) {
		if (selectedTags.indexOf(id) == -1) {
			selectedTags = [...selectedTags, id];
		} else {
			selectedTags = selectedTags.filter((e) => e !== id);
		}
	}
</script>

<nav>
	<h2>CodeTime</h2>

	{#if isManager}
		<section>
			<h3>UŽIVATEL</h3>
		</section>
	{/if}

	<Datepicker on:change={handleDateChange} />

	<section>
		<h3>Štítky</h3>
		{#each $tagStore as tag}
			<div class="tag">
				<Checkbox --bg={tag.color} on:change={(e) => handleTagChange(tag.id)} />{tag.name}
			</div>
		{/each}
	</section>
</nav>

<style lang="scss">
	nav {
		height: 100vh;
		width: 100%;
		border-right: 2px solid $green-primary;
		display: flex;
		flex-direction: column;
		padding: 1.6rem;
		gap: 0.8rem;
		position: sticky;
		top: 0px;
	}

	h2 {
		background: lighten($background, 10);
		padding: 0.8rem;
		color: $green-primary;
		width: 100%;
		text-align: center;
	}

	.tag {
		padding: 0.4rem;
		color: white;
		display: flex;
		gap: 0.8rem;
		align-items: center;
	}
</style>
