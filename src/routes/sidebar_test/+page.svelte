<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';

	let isOpen = false;

	const switchOpen = () => {
		isOpen = !isOpen;
	};
</script>

<Button on:click={switchOpen}>Open</Button>

<Sidebar open={isOpen} on:close={switchOpen} title="Můj nový sidebar">Prosím funguj</Sidebar>
