<script lang="ts">
	import type { PageData } from './$types';
	import Sidenav from './Sidenav.svelte';
	import Table from './Table.svelte';
</script>

<section class="home-page">
	<Sidenav />
	<section class="content">
		<Table />
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
