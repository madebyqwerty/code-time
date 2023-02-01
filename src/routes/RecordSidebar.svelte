<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import type { Records } from '$lib/pocketbase/recordsStore';

	export let record: Records;
	export let open = false;
</script>

<Sidebar bind:open title="Záznam ze dne {record.date.toLocaleDateString('cs')}">
	<div class="table">
		<div class="row"><span class="heading">Délka</span> <span>{record.length}</span></div>
	</div>
</Sidebar>

<style lang="scss">
	.table {
		display: grid;
		grid-template-columns: max-content 1fr;
	}

	.row:not(:last-child) {
		display: contents;
		border-bottom: 1px solid $background-light;
	}

	.heading {
		@include text-lg;
		margin-right: 2.4rem;
	}
</style>
