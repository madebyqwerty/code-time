<script lang="ts">
	import { languageColors, languageNames } from '$lib/utils/languages';
	import type { Records } from '$lib/pocketbase/recordsStore';
	import RecordSidebar from './RecordSidebar.svelte';
	import { getTagFromID } from '$lib/utils/getTagFromID';
	import TableTag from '$lib/components/TableTag.svelte';
	import { getTextColor } from '$lib/utils/getTextColor';

	export let record: Records;
	export let i: number;

	let open = false;

	const openSidebar = () => (open = true);
</script>

<tr style="--animation-order:{(i + 1) * 200}ms" class="row" on:click={openSidebar}>
	<td class="text-sm white">{record.date.toLocaleDateString('cs')}</td>
	<td class="text-sm white text-center">{record.length}</td>
	<td class="text-sm number white silkscreen">{'*'.repeat(record.rating)}</td>
	<td class="text-sm white languages">
		{#each record.language as language}
			<TableTag
				--textColor={getTextColor(languageColors[language])}
				--backgroundColor={languageColors[language]}>{languageNames[language]}</TableTag>
		{/each}
	</td>
	<td class="text-sm white tags">
		{#each record.tags as tagID}
			{@const tag = getTagFromID(tagID)}
			{#if tag}
				<TableTag
					--textColor={getTextColor(tag.color)}
					--backgroundColor={tag.color}
					description={tag.description}>{tag.name}</TableTag>
			{/if}
		{/each}
	</td>
</tr>

<RecordSidebar {record} bind:open />

<style lang="scss">
	@keyframes appear {
		from {
			transform: translate(0, 20%);
		}
		to {
			transform: translate(0, 0);
			opacity: 100;
		}
	}
	.silkscreen{
		font-family:"Silkscreen", cursive;
	}
	tr.row {
		animation: appear 1s forwards;
		animation-delay: var(--animation-order);
		transform: translate(0, 20%);
		opacity: 0;
		cursor: pointer;
		&:hover {
			background: lighten($background-light, 10) !important;
		}
	}

	td {
		padding: 1.6rem 1.2rem;
		vertical-align: top;
	}

	.languages {
		vertical-align: top;
		
	}
	.tags{
		vertical-align: top;

	}
</style>
