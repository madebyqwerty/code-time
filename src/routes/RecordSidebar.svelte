<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import type { Records } from '$lib/pocketbase/recordsStore';
	import Label from '$lib/components/forms/Label.svelte';
	import { getTagFromID } from '$lib/utils/getTagFromID';
	import TableTag from '$lib/components/TableTag.svelte';
	import { getTextColor } from '$lib/utils/getTextColor';
	import { languageColors, languageNames } from '$lib/utils/languages';

	export let record: Records;
	export let open = false;
</script>

<Sidebar bind:open title="Záznam ze dne {record.date.toLocaleDateString('cs')}">
	<div class="table">
		<div class="row">
			<span>Délka</span>
			<div>{record.length}</div>
		</div>
		<div class="row">
			<span>Obtížnost</span>
			<div class="silkscreen">{'*'.repeat(record.rating)}</div>
		</div>
		<div class="row">
			<span>Jazyky</span>
			<div>
				{#each record.language as language}
					<TableTag
						--textColor={getTextColor(languageColors[language])}
						--backgroundColor={languageColors[language]}>{languageNames[language]}</TableTag>
				{/each}
			</div>
		</div>
		<div class="row">
			<span>Tagy</span>
			<div>
				{#each record.tags as tagID}
					{@const tag = getTagFromID(tagID)}
					<TableTag --textColor={getTextColor(tag.color)} --backgroundColor={tag.color}
						>{tag.name}</TableTag>
				{/each}
			</div>
		</div>
	</div>
	<div class="content">
		<Label>Popis</Label>
		<p>
			{record.description}
		</p>
	</div>
</Sidebar>

<style lang="scss">
	.table {
		display: grid;
		grid-template-columns: max-content 1fr;
	}

	.row {
		display: contents;
		& > * {
			padding: 0.8rem;
		}
		& > span {
			@include text-lg;
			padding-right: 2.4rem;
		}
		& > div {
			display: flex;
			flex-wrap: wrap;
		}
	}

	.row:not(:last-child) {
		& > * {
			border-bottom: 1px solid $background-light;
		}
	}

	.content {
		margin-top: 2.4rem;
	}
</style>