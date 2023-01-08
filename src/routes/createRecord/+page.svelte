<script lang="ts">
	import { dateRecords } from '$lib/pocketbase/dateRecords';

	function handleClick() {
		const date = new Date()
		date.setDate(date.getDate() + 30);
		dateRecords(new Date(), date);
	}
</script>

<button on:click={handleClick}>Vytvořit záznam</button>
