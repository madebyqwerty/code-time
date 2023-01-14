<script lang="ts">
	import { createRecord } from '$lib/pocketbase';

	import { login } from '$lib/pocketbase';
	import Wrapper from '../auth/Wrapper.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/forms/Input.svelte';



	function handleClick() {
		createRecord(new Date(), 5, ['JavaScript', 'Svelte'], 4, 'Programoval jsem na tourdeapp', [
			'98bw75lmks7agui'
		]);
	}
	let selectedOptions:Array;

	$:console.log(selectedOptions)
</script>


<button on:click={handleClick}>Vytvořit záznam</button>


<Wrapper>
	<form class="wrapper" >
		<h1 class="width-max white">CREATE RECORD</h1>
		<Input type="text"  placeholder="Naučil jsem se používat print() v Pythonu" label="Popis" />
		<Input
			type="range"
			placeholder="*****"
			showPasswordSwitch={true}
			label="Obtížnost"
		/>
		<Input type="select" label="Jazyky" options={["HTML", "CSS", "JavaScript"]} bind:selectedOptions/>
		<Button>Submit</Button>
	</form>
</Wrapper>

<style lang="scss">
	.wrapper {
		@include center;
	}
	.wrapper{
		padding:3rem 0;
		align-items:start;
		gap:8px;
	}
</style>

<button on:click={handleClick}>Vytvořit záznam</button>

