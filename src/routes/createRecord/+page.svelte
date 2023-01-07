<script lang="ts">
	import { createRecord } from '$lib/pocketbase';

	function handleClick() {
		createRecord(new Date(), 5, ['Javascript', 'Svelte'], 4, 'Programoval jsem na tourdeapp', [
			'tourdeapp'
		]);
	}
</script>

<button on:click={handleClick}>Vytvořit záznam</button>
