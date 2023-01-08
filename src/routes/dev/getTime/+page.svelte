<script lang="ts">
	import { getRecordsByDate } from '$lib/pocketbase/getRecordsByDate';

	function handleClick() {
		const date = new Date()
		date.setDate(date.getDate() + 30);
		getRecordsByDate(new Date(), date);
	}
</script>

<button on:click={handleClick}>Získat data</button>
