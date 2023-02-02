<script lang="ts">
	import { goto } from '$app/navigation';
	import { isLoggedIn, pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	onMount(async () => {
		pb.authStore.clear();
		await goto('/');
	});
</script>

<main>
	<h1>Odhlašování</h1>
</main>

<style>
	main {
		width: 100vh;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
