<script lang="ts">
	import { populateDatabase } from '$lib/pocketbase/dev/populateDatabase';

	let users = 5;
	let tags = 5;

	function handleClick() {
		populateDatabase(users, tags);
	}
</script>

Users: {users}
<input min={1} max={25} type="range" bind:value={users}/>
<br>

Tags: {tags}
<input min={1} max={25} type="range" bind:value={tags}/>
<br>

<button on:click={handleClick}>Zaplnit databázy</button>

