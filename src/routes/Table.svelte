<script lang="ts">
	import { languageColors, languageNames } from '$lib/utils/languages';
	import CreateButton from './CreateButton.svelte';
	import CreateRecord from './CreateRecord.svelte';
	import { recordsStore } from '$lib/pocketbase/recordsStore';
	import Button from '$lib/components/Button.svelte';

	let open = false;

	let sortedData = $recordsStore;

	interface sortingOption {
		id: 'newest' | 'oldest' | 'hardest' | 'easiest';
		name: string;
	}

	const sortingOptions: sortingOption[] = [
		{
			id: 'newest',
			name: 'Od nejnovějších'
		},
		{
			id: 'oldest',
			name: 'Od nejstarších'
		},
		{ id: 'hardest', name: 'Od nejobtížnějších' },
		{
			id: 'easiest',
			name: 'Od nejlehčích'
		}
	];

	let selected: sortingOption = {
		id: 'newest',
		name: 'Od nejnovějších'
	};

	console.log(sortedData);

	const sortingFunctions = {
		newest: () => sortedData.sort((a, b) => b.date.getTime() - a.date.getTime()),
		oldest: () => sortedData.sort((a, b) => a.date.getTime() - b.date.getTime()),
		hardest: () => sortedData.sort((a, b) => b.rating - a.rating),
		easiest: () => sortedData.sort((a, b) => a.rating - b.rating)
	};

	$: sortedData = sortingFunctions[selected.id]();
</script>

<section>
	<header>
		<h2>Záznamy</h2>
		<CreateButton
			on:click={() => {
				open = !open;
			}}
			{open}
		/>
	</header>
	<label for="sort">Filtrovat podle</label>
	<select name="sort" id="sort" bind:value={selected.id}>
		{#each sortingOptions as sortOption}
			<option value={sortOption.id}>{sortOption.name}</option>
		{/each}
	</select>
	<table class="table-default">
		<th><h4>Datum</h4></th>
		<th><h4>Délka</h4></th>
		<th><h4>Jazyky</h4></th>
		<th><h4>Obtížnost</h4></th>
		<th><h4>Tag</h4></th>
		{#each sortedData as record (record.id)}
			<tr>
				<td class="text-sm white">{record.date.toLocaleDateString('cs')}</td>
				<td class="text-sm white">{record.length}</td>
				<td class="text-sm white">
					{#each record.language as language}
						<span class="language" style="background: {languageColors[language]};"
							>{languageNames[language]}</span
						>
					{/each}
				</td>
				<td class="text-sm number white">{'*'.repeat(record.rating)}</td>
				{#each record.expand?.tags as tag}
					<td class="text-sm white">{tag.name}</td>
				{:else}
					<td />
				{/each}
			</tr>
		{/each}
	</table>

	{#if $recordsStore.length < 1}
		<div class="no-data">
			<h3>Nemáš ještě žádný záznam</h3>
			<Button on:click={() => (open = true)}>Přidat záznam</Button>
		</div>
	{/if}

	<CreateRecord bind:open />
</section>

<style lang="scss">
	.no-data {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 2rem;
		padding-top: 2rem;
		gap: 2rem;
		& > h3 {
			font-family: 'Fira Code', monospace;
		}
	}

	select {
		background: lighten($background, 10);
	}

	table {
		width: 100%;
	}

	td {
		padding: 1.2rem;

		&:not(:first-child) {
			border-left: 1px solid lighten($background, 20);
		}
		&:not(:last-child) {
			border-right: 1px solid lighten($background, 20);
		}
	}

	tr:nth-of-type(odd) {
		background-color: lighten($background, 5);
	}

	th {
		padding-bottom: 2rem;
		padding-top: 2rem;
		border-bottom: 1px solid $green-primary;
	}

	h4 {
		color: white;
		text-align: left;
	}
	.number {
		font-size: 2.5rem;
		font-family: 'Silkscreen';
		text-align: center;
	}

	.language {
		padding: 0.5rem;
		font-size: 1.7rem;
		margin-right: 1rem;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
