<script lang="ts">
	import { languageColors, languageNames } from '$lib/utils/languages';
	import CreateButton from './CreateButton.svelte';
	import CreateRecord from './CreateRecord.svelte';
	import { recordsStore } from '$lib/pocketbase/recordsStore';
	import { tagStore } from '$lib/pocketbase/tagStore';
	import Button from '$lib/components/Button.svelte';

	let open = false;
	let sortedData = $recordsStore;

	interface sortingOption {
		id: 'newest' | 'oldest' | 'hardest' | 'easiest' | 'longest' | 'shortest';
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
		},
		{
			id: 'longest',
			name: 'Od nejdelších'
		},
		{
			id: 'shortest',
			name: 'Od nejkratších'
		}
	];

	let selected: sortingOption = {
		id: 'newest',
		name: 'Od nejnovějších'
	};

	const sortingFunctions = {
		newest: () => sortedData.sort((a, b) => b.date.getTime() - a.date.getTime()),
		oldest: () => sortedData.sort((a, b) => a.date.getTime() - b.date.getTime()),
		hardest: () => sortedData.sort((a, b) => b.rating - a.rating),
		easiest: () => sortedData.sort((a, b) => a.rating - b.rating),
		shortest: () => sortedData.sort((a, b) => a.length - b.length),
		longest: () => sortedData.sort((a, b) => b.length - a.length)
	};

	$: sortedData = $recordsStore;
	$: sortedData = sortingFunctions[selected.id]();
	$: console.log($tagStore);
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
	{#key sortedData}
		<table class="table-default">
			<colgroup>
				<col class="table-date" />
				<col class="table-length" />
				<col class="table-langs" />
				<col class="table-diff" />
				<col class="table-tags" />
			</colgroup>
			<tr>
				<th><h4>Datum</h4></th>
				<th><h4>Délka</h4></th>
				<th><h4>Jazyky</h4></th>
				<th><h4>Obtížnost</h4></th>
				<th><h4>Tags</h4></th>
			</tr>

			{#each sortedData as record, i}
				<tr style="--animation-order:{i * 100}ms">
					<td class="text-sm white">{record.date.toLocaleDateString('cs')}</td>
					<td class="text-sm white text-center">{record.length}</td>
					<td class="text-sm white">
						{#each record.language as language}
							<span class="language" style="background: {languageColors[language]};"
								>{languageNames[language]}</span
							>
						{/each}
					</td>
					<td class="text-sm number white">{'*'.repeat(record.rating)}</td>
					<td class="text-sm white">
						{#each record.tags as tag, i}
							<span>
								{tag}
								{$tagStore.filter((taglmao) => taglmao.id == tag)[0].name}
								{#if i + 1 < record.tags.length},{/if}
							</span>
						{/each}
					</td>
				</tr>
			{/each}
		</table>
	{/key}

	{#if $recordsStore.length < 1}
		<div class="no-data">
			<h4>Nenašli jsme žádný záznam</h4>
			<Button on:click={() => (open = true)}>Přidat nový</Button>
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
		& > h4 {
			font-family: 'Fira Code', monospace;
		}
	}

	select {
		background: lighten($background, 10);
	}

	table {
		width: 100%;
		margin-bottom: 8rem;
		table-layout: fixed;
	}
	.table {
		&-date {
			width: 13rem;
		}
		&-length {
			width: 13rem;
		}
		&-diff {
			width: 20rem;
		}
	}

	@keyframes appear {
		from {
			transform: translate(0, 20%);
		}
		to {
			transform: translate(0, 0);
			opacity: 100;
		}
	}

	tr {
		animation: appear 1s forwards;
		animation-delay: var(--animation-order);
		transform: translate(0, 20%);
		opacity: 0;
	}

	td {
		padding: 1.2rem;
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
		text-align: center;
	}
	.number {
		font-size: 2.5rem;
		font-family: 'Silkscreen';
		text-align: center;
	}

	.language {
		padding: 0.3rem 0.5rem;
		font-size: 1.7rem;
		line-height: 200%;
		margin-right: 1rem;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
