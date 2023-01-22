<script lang="ts">
	import { recordsStore } from '$lib/pocketbase/recordsStore';
	import Graph from './Graph.svelte';
	import Sidenav from './Sidenav/Sidenav.svelte';
	import Table from './Table.svelte';
</script>

<section class="home-page">
	<Sidenav />
	<section class="content">
		{#if $recordsStore.length > 0}
			<Graph />
			<Table />
		{/if}
	</section>
</section>

<style lang="scss">
	.home-page {
		display: grid;
		grid-template-columns: 400px 1fr;
		max-width: 100vw;
	}

	.content {
		padding-top: 3.2rem;
		padding-left: 10%;
		padding-right: 10%;
	}
</style>
