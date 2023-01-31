<script lang="ts">
	import { languageColors, languageNames } from '$lib/utils/languages';
	import CreateButton from './CreateButton.svelte';
	import CreateRecord from './CreateRecord.svelte';
	import { recordsStore } from '$lib/pocketbase/recordsStore';
	import { tagStore } from '$lib/pocketbase/tagStore.ts';
	import Button from '$lib/components/Button.svelte';

	let open = false;
	let sortedData = $recordsStore;

	let selected: string = "newest"

	const sortingFunctions = {
		newest: () => sortedData.sort((a, b) => b.date.getTime() - a.date.getTime()),
		oldest: () => sortedData.sort((a, b) => a.date.getTime() - b.date.getTime()),
		hardest: () => sortedData.sort((a, b) => b.rating - a.rating),
		easiest: () => sortedData.sort((a, b) => a.rating - b.rating),
		shortest: () => sortedData.sort((a, b) => a.length - b.length),
		longest: () => sortedData.sort((a, b) => b.length - a.length)
	};

	$: sortedData = $recordsStore;
	$: sortedData = sortingFunctions[selected]();
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

	{#key sortedData}
		<table class="table-default sortable">
			<colgroup>
				<col class="table-date" />
				<col class="table-length" />
				<col class="table-langs" />
				<col class="table-diff" />
				<col class="table-tags" />
			</colgroup>
			<thead>
				<tr>
					<th
						><button on:click={()=>{if(selected=="newest"){selected="oldest"}else{selected="newest"}}}
							><h4>Datum</h4>
							<div class="arrows">
								<div class="up" style={selected=="oldest"?"border-color: transparent transparent white transparent":""}/>
								<div class="down" style={selected=="newest"?"border-color:white transparent transparent transparent":""}/>
							</div></button
						></th
					>
					<th
						><button on:click={()=>{if(selected=="longest"){selected="shortest"}else if(selected=="shortest"){selected="newest"}else{selected="longest"}}}
							><h4>Délka</h4>
							<div class="arrows">
								<div class="up" style={selected=="shortest"?"border-color: transparent transparent white transparent":""}/>
								<div class="down" style={selected=="longest"?"border-color:white transparent transparent transparent":""}/>
							</div></button
						></th
					>
					<th><h4>Jazyky</h4></th>
					<th
						><button on:click={()=>{if(selected=="hardest"){selected="easiest"}else if(selected=="easiest"){selected="newest"}else{selected="hardest"}}}
							><h4>Obtížnost</h4>
							<div class="arrows">
								<div class="up" style={selected=="easiest"?"border-color: transparent transparent white transparent":""}/>
								<div class="down" style={selected=="hardest"?"border-color:white transparent transparent transparent":""}/>
							</div></button
						></th
					>
					<th><h4>Tags</h4></th>
				</tr>
			</thead>

			<tbody>
				{#each sortedData as record, i}
					<tr style="--animation-order:{i * 100}ms" class="row">
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
								{#if $tagStore}
									<span>
										{$tagStore.filter((taglmao) => taglmao.id == tag)[0].name}
										{#if i + 1 < record.tags.length},{/if}
									</span>
								{/if}
							{/each}
						</td>
					</tr>
				{/each}
			</tbody>
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

	tr.row {
		animation: appear 1s forwards;
		animation-delay: var(--animation-order);
		transform: translate(0, 20%);
		opacity: 0;
	}

	td {
		padding: 1.2rem;
	}

	td:not(:last-child) {
		border-right: 1px solid $background-light;
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

	select {
		margin-bottom: 3.2rem;
	}
	th>button{
		display:flex;
		flex-direction:row;
		padding:0 2rem;
		width:100%;
		justify-content:center;
		position:relative;
	}
	.arrows{
		display:flex;
		flex-direction:column;
		justify-content: center;
		align-items:center;
		gap:3px;
		position:absolute;
		right:0;
		top:50%;
		transform:translateY(-50%);
	}
	.up{
		border-width: 0 .7rem .7rem .7rem;
		border-style:solid;
		border-color: transparent transparent darken(#181c24,5) transparent;
	}
	.down{
		border-width: .7rem .7rem 0 .7rem;
		border-style:solid;
		border-color:darken(#181c24,5) transparent transparent transparent;
	}
</style>
