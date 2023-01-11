<script lang="ts">
	import type { PageData } from './$types';
	import Table from './Table.svelte';

	export let data: PageData;
</script>

<section class="home-page">
	<!-- TODO: Move to it's own file -->
	<nav>
		<h3>CodeTime</h3>
	</nav>
	<section class="content">
		<Table records={data.records} />
	</section>
</section>

<style lang="scss">
	.home-page {
		display: grid;
		grid-template-columns: 300px 1fr;
		width: 100vw;
	}

	nav {
		height: 100vh;
		width: 100%;
		border-right: 2px solid $green-primary;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1.6rem;
	}

	.content {
		padding-top: 3.2rem;
		margin-left: auto;
		margin-right: auto;
	}
</style>
