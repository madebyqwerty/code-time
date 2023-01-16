<script>
	import Home from '$lib/components/Home.svelte';
	import { currentUser } from '$lib/pocketbase';
</script>

{#if $currentUser}
	<slot />
{:else}
	<Home />
{/if}
