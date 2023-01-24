<script lang="ts">
	import { createRecord } from '$lib/pocketbase';
	import { login } from '$lib/pocketbase';
	import Wrapper from '../auth/Wrapper.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import Multiselect from '$lib/components/forms/Multiselect.svelte';

	function handleClick() {
		createRecord(new Date(), 5, ['JavaScript', 'Svelte'], 4, 'Programoval jsem na tourdeapp', [
			'98bw75lmks7agui'
		]);
	}
	let selectedOptions: string[];
	let w;
</script>

<button on:click={handleClick}>Vytvořit záznam</button>

{@html `<${''}style>.multiselect-wrapper{\nwidth:100%;\nmax-width:${w}px !important;\n} </${''}style>`}
<Wrapper>
	<form class="wrapper">
		<h1 class="width-max white">CREATE RECORD</h1>
		<Input type="text" placeholder="Naučil jsem se používat print() v Pythonu" label="Popis" />
		<Input type="range" placeholder="*****" showPasswordSwitch={true} label="Obtížnost" />
		<div id="meter" bind:clientWidth={w} style="width:100%;" />
		<div class="multiselect-wrapper"><Multiselect bind:selected={selectedOptions} /></div>

		<Button>Submit</Button>
	</form>
</Wrapper>

<button on:click={handleClick}>Vytvořit záznam</button>

<style lang="scss">
	.wrapper {
		@include center;
	}
	.wrapper {
		padding: 3rem 0;
		align-items: start;
		gap: 8px;
	}
</style>
