<script lang="ts">
	import { onMount } from "svelte";


	export let value: string;
	export let type: string;
	export let placeholder: string;
	let input: HTMLInputElement;
	let mounted:boolean;
	onMount(()=>{
		input.type = type;
		mounted=true
	})
	$:{
		if(mounted){
			input.type=type
		}
	}

</script>

<input
	
	bind:value
	bind:this={input}
	{placeholder}
	class="input-default text-base"
/>
