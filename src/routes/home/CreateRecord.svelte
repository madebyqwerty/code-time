<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import Button from '$lib/components/Button.svelte';

	export let open = false;

	let selectedOptions: string[];
</script>

<Sidebar bind:open title="Přidat záznam">
	<div class="create-wrapper ">
		<form class="wrapper">
			<Input type="text" placeholder="Naučil jsem se používat print() v Pythonu" label="Popis" />
			<Input type="range" placeholder="*" label="Obtížnost" />
			<Input
				type="select"
				label="Jazyky"
				options={['HTML', 'CSS', 'JavaScript']}
				bind:selectedOptions
			/>
			<Button>Submit</Button>
		</form>
	</div>
</Sidebar>
