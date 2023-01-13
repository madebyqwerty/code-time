<script lang="ts">
	import { populateDatabase } from '$lib/pocketbase/dev/populateDatabase';
	import { currentUser } from '$lib/pocketbase';
	import Button from '$lib/components/Button.svelte';
	let users = 5;
	let tags = 5;

	function handleClick() {
		populateDatabase(users, tags);
	}
</script>

Currently logged in as {$currentUser?.id}
{$currentUser?.email}

<br />

Users: {users}
<input min={1} max={25} type="range" bind:value={users} />
<br />

Tags: {tags}
<input min={1} max={25} type="range" bind:value={tags} />
<br />

<Button on:click={handleClick}>Zaplnit db</Button>
