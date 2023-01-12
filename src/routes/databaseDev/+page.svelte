<script lang="ts">
	import { populateDatabase } from '$lib/pocketbase/dev/populateDatabase';

	export let id;
	export let min = 1;
	export let max = 25;
	export let step = 1;
	export let users = 5;

	export let id2;
	export let tags = 5;

	function handleClick() {
		populateDatabase(users, tags);
	}
</script>

Users: {users}
<input
  type="range"
  {id} {min} {max} {step}
  name="{id}"
  bind:value={users}
/>

<br>

Tags: {tags}
<input
  type="range"
  {id2} {min} {max} {step}
  name="{id2}"
  bind:value={tags}
/>

<br>

<button on:click={handleClick}>Zaplnit databázy</button>

