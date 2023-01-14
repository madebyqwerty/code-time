<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';

	let isOpen = false;

	const switchOpen = () => {
		isOpen = !isOpen;
	};

	$: {
		console.log(isOpen);
	}
</script>

<Button on:click={switchOpen}>Open</Button>

<Sidebar bind:open={isOpen} title="Můj nový sidebar">Prosím funguj</Sidebar>
