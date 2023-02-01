<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import type { Records } from '$lib/pocketbase/recordsStore';
	import Label from '$lib/components/forms/Label.svelte';

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
					{language}
				{/each}
			</div>
		</div>
		<div class="row">
			<span>Tagy</span>
			{#each record.tags as tag}
				{tag}
			{/each}
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
