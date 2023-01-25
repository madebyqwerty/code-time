<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Textarea from '$lib/components/forms/Textarea.svelte';
	import Range from '$lib/components/forms/Range.svelte';
	import Button from '$lib/components/Button.svelte';
	import { createRecord } from '$lib/pocketbase';
	import { login } from '$lib/pocketbase';
	import Multiselect from '$lib/components/forms/Multiselect.svelte';

	export let open = false;

	let selectedOptions: string[];
	let diff: number;
	let w;
	export let inputData = {
		difficulty:3,
		description:"",
		languages:[],
		tags:[]
	};
</script>

<Sidebar bind:open title="Přidat záznam">
	<div class="create-wrapper ">
		<form class="wrapper">
			<Textarea bind:value={inputData.description} placeholder="Naučil jsem se používat print() v Pythonu" label="Popis" />
			<Range bind:value={inputData.difficulty} name="obtiznost" label="Obtížnost"/>
			<div id="meter" bind:clientWidth={w} style="width:100%;" />
			<div class="multiselect-wrapper"><Multiselect placeholder="Vybrat jazyk" bind:selected={inputData.languages} /></div>
			<div class="multiselect-wrapper"><Multiselect placeholder="Vybrat štítky" bind:selected={inputData.tags} /></div>
			<Button>Submit</Button>
		</form>
	</div>
</Sidebar>

<style>
	.multiselect-wrapper{
		margin:2rem 0;
	}
</style>