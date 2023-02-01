<script lang="ts">
	import { recordsStore } from '$lib/pocketbase/recordsStore';
	import Graph from './Graph.svelte';
	import Sidenav from './Sidenav/Sidenav.svelte';
	import Table from './Table.svelte';
	import { currentUser } from '$lib/pocketbase';
	import ManagerMenu from './manager/ManagerMenu.svelte';

	let selectedTags=[];
</script>

<section class="home-page">
	<Sidenav bind:selectedTags/>
	<section class="content">
		{#if $currentUser.is_manager}
			<ManagerMenu />
		{/if}
		{#key $recordsStore}
			<Graph />
		{/key}
		<Table bind:selectedTags/>
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
		display: flex;
		flex-direction: column;
		gap: 6.4rem;
	}
</style>
