<script lang="ts">
	import { languageColors, languageNames } from '$lib/utils/languages';
	import CreateButton from './CreateButton.svelte';
	import CreateRecord from './CreateRecord.svelte';
	import { recordsStore } from '$lib/pocketbase/recordsStore';

	let open = false;
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

	<table class="table-default">
		<th class="white"><h4>Datum</h4></th>
		<th class="white"><h4>Délka</h4></th>
		<th class="white"><h4>Jazyky</h4></th>
		<th class="white"><h4>Obtížnost</h4></th>
		<th class="white"><h4>Popis</h4></th>
		<th class="white"><h4>Tag</h4></th>
		{#each $recordsStore as record}
			<tr>
				<td class="text-sm white">{record.date.toLocaleDateString('cs')}</td>
				<td class="text-sm number-sm white">{record.length}</td>
				<td class="text-sm white">
					{#each record.language as language}
						<span class="language" style="background: {languageColors[language]};"
							>{languageNames[language]}</span
						>
					{/each}
				</td>
				<td class="text-sm number white">{'*'.repeat(record.rating)}</td>
				<td class="text-sm white">{record.description?.substring(0, 20)}</td>
				{#each record.expand?.tags as tag}
					<td class="text-sm white">{tag.name}</td>
				{:else}
					<td />
				{/each}
			</tr>
		{/each}
	</table>

	<CreateRecord bind:open />
</section>

<style lang="scss">
	table {
		width: 100%;
	}

	h4 {
		color: white;
	}

	td {
		padding: 1.5rem;

		&:not(:first-child) {
			border-left: 1px solid lighten($background, 10);
		}
		&:not(:last-child) {
			border-right: 1px solid lighten($background, 10);
		}
	}

	tr:nth-of-type(odd) {
		background-color: darken($background, 10%);
	}

	th {
		padding: 2rem;
		border-bottom: 1px solid $green-primary;
	}

	.number {
		font-size: 2.5rem;
		font-family: 'Silkscreen';
		text-align: center;
		&-sm {
			font-size: 2rem;
			text-align: center;
		}
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
