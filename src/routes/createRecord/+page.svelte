<script lang="ts">
	import { populateDatabase } from '$lib/pocketbase/dev/populate-database';

	function handleClick() {
		populateDatabase();
	}
</script>

<button on:click={handleClick}>Vytvořit záznam</button>
