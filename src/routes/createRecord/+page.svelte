<script lang="ts">
	import { createRecord } from '$lib/pocketbase';
	function handleClick() {
		createRecord(new Date(), 5, ['JavaScript', 'Svelte'], 4, 'Programoval jsem na tourdeapp', [
			'98bw75lmks7agui'
		]);
	}
</script>

<button on:click={handleClick}>Vytvořit záznam</button>