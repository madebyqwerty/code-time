<script lang="ts">
	import { languageColors, languageNames } from '$lib/utils/languages';
	import type { Records } from '$lib/pocketbase/recordsStore';
	import { tagStore } from '$lib/pocketbase/tagStore';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import RecordSidebar from './RecordSidebar.svelte';
	import { fade } from 'svelte/transition';
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
					{$tagStore.filter((taglmao) => taglmao.id == tag)[0].name}
					{#if i + 1 < record.tags.length},{/if}
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
	}

	td {
		padding: 1.2rem;
		position: relative;
	}

	td:not(:last-child) {
		border-right: 1px solid lighten($background, 2.5);
	}

	tr:nth-of-type(odd) > td::before {
		background: lighten($background, 5);
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
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
