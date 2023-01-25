<script lang="ts">
	import Home from '$lib/components/Home.svelte';
	import { currentUser } from '$lib/pocketbase';
	import Dashboard from './Dashboard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if $currentUser}
	<Dashboard {data} />
{:else}
	<Home />
{/if}
