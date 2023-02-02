<script lang="ts">
	import Home from '$lib/components/Home.svelte';
	import { isLoggedIn } from '$lib/pocketbase';
	import Dashboard from './Dashboard.svelte';
</script>

{#if $isLoggedIn}
	<Dashboard />
{:else}
	<Home />
{/if}
