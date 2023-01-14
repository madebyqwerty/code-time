<script lang="ts">
	import { getRecordsByDate } from '$lib/pocketbase/getRecordsByDate';

	async function handleClick() {
		const date = new Date()
		date.setDate(date.getDate() + 30);
		console.log(await getRecordsByDate(new Date(), date));
	}
</script>

<button on:click={handleClick}>Získat data</button>
