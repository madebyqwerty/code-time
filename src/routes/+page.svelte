<script>
	import Home from '$lib/components/Home.svelte';
	import { currentUser } from '$lib/pocketbase';
	import Dashboard from './Dashboard.svelte';
</script>

{#if $currentUser}
	<Dashboard />
{:else}
	<Home />
{/if}
