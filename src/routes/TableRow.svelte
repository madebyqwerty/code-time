<script lang="ts">
	import { languageColors, languageNames } from '$lib/utils/languages';
	import type { Records } from '$lib/pocketbase/recordsStore';
	import { tagStore } from '$lib/pocketbase/tagStore';
	import RecordSidebar from './RecordSidebar.svelte';
	import { getTagFromID } from '$lib/utils/getTagFromID';
	export let record: Records;
	export let i: number;

	let open = false;

	const openSidebar = () => (open = true);

	const closeSidebar = () => (open = false);
</script>

<tr style="--animation-order:{(i + 1) * 200}ms" class="row" on:click={openSidebar}>
	<td class="text-sm white">{record.date.toLocaleDateString('cs')}</td>
	<td class="text-sm white text-center">{record.length}</td>
	<td class="text-sm number white">{'*'.repeat(record.rating)}</td>
	<td class="text-sm white">
		{#each record.language as language}
			<span class="language" style="background: {languageColors[language]};"
				>{languageNames[language]}</span>
		{/each}
	</td>
	<td class="text-sm white">
		{#each record.tags as tag, i}
			{#if $tagStore}
				<span>
					{getTagFromID(tag).name}
				</span>
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
		padding: 1.2rem;
		position: relative;
	}

	td:not(:last-child) {
		border-right: 1px solid lighten($background, 15);
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
</style>
