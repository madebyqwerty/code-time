<script lang="ts">
	import Popup from '$lib/components/Popup.svelte';

	
	export let name: string = '';
	export let color: string = '';
	export let id: string = '';
	export let description: string = '';

	let open: boolean = false;
	let count = 0;
	$:{console.log(open,count);count++;}

</script>

<span
	on:mouseover={()=>{open=true}}
	on:mouseout={()=>{open=false}}
	class="table-tag">
	<slot />

			<Popup bind:open bind:name bind:color bind:id bind:description />
	
</span>

<style lang="scss">
	.table-tag {
		border: 2px solid var(--borderColor, '#ffffffbb');
		padding: 0.4rem;
		background: var(--backgroundColor, '#ffffff55');
		color: var(--color, '#ffffff');
		cursor: pointer;
		position: relative;
	}
	
</style>
