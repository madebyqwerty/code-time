<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	onMount(async () => {
		pb.authStore.clear();
		await goto('/');
	});
</script>
