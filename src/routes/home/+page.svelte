<script lang="ts">
	import { languages } from '$lib/utils/languages';
	import type { PageData } from './$types';
	import Table from './Table.svelte';

	export let data: PageData;
</script>

<section class="home-page">
	<h1>Code Time</h1>

	<Table records={data.records} />
</section>

<style lang="scss">
	.home-page {
		@include center;
		width: 100vw;
		padding-top: 10rem;
	}
</style>
