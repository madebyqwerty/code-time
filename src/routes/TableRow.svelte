<script lang="ts">
	import { languageColors, languageNames } from '$lib/utils/languages';
	import type { Records } from '$lib/pocketbase/recordsStore';
	import RecordSidebar from './RecordSidebar.svelte';
	import { getTagFromID } from '$lib/utils/getTagFromID';
	import TableTag from '$lib/components/TableTag.svelte';
	export let record: Records;
	export let i: number;

	let open = false;

	const openSidebar = () => (open = true);

	function getTextColor(color: string) {
		const r = parseInt(color.substring(1, 3), 16);
		const g = parseInt(color.substring(3, 5), 16);
		const b = parseInt(color.substring(5, 7), 16);

		const yiq = (r * 299 + g * 587 + b * 114) / 1000;
		console.log(yiq);
		return yiq >= 128 ? '#0e1015' : '#fff';
	}
</script>

<tr style="--animation-order:{(i + 1) * 200}ms" class="row" on:click={openSidebar}>
	<td class="text-sm white">{record.date.toLocaleDateString('cs')}</td>
	<td class="text-sm white text-center">{record.length}</td>
	<td class="text-sm number white">{'*'.repeat(record.rating)}</td>
	<td class="text-sm white">
		{#each record.language as language}
			<TableTag
				--textColor={getTextColor(languageColors[language])}
				--backgroundColor={languageColors[language]}>{languageNames[language]}</TableTag>
		{/each}
	</td>
	<td class="text-sm white">
		{#each record.tags as tagID}
			{@const tag = getTagFromID(tagID)}
			<span>
				<TableTag --textColor={getTextColor(tag.color)} --backgroundColor={tag.color}
					>{tag.name}</TableTag>
			</span>
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
