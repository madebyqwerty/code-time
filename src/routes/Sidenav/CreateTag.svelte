<script lang="ts">
	import Input from '$lib/components/forms/Input.svelte';
	import ColorPicker from './ColorPicker.svelte';
	import SidebarLeft from '$lib/components/SidebarLeft.svelte';
	import Button from '$lib/components/Button.svelte';
	import { createTag } from '$lib/pocketbase/createTag';
	import { toast } from '@zerodevx/svelte-toast';
	import { invalidate } from '$app/navigation';

	export let openCreateTag = false;

	let addTagInput = '';
	let color = '';
	let description = '';

	const setBg = () => {
		const randomColor =
			Math.floor(Math.random() * 160 + 47).toString(16) +
			Math.floor(Math.random() * 160 + 47).toString(16) +
			Math.floor(Math.random() * 160 + 47).toString(16);
		let n = 6 - randomColor.length;
		color = '#' + '0'.repeat(n) + randomColor;
	};

	setBg();

	async function handleAdd() {
		await createTag(addTagInput, color, description)
			.then(async () => {
				openCreateTag = false;
				addTagInput = '';
				setBg();
				await invalidate('home');
			})
			.catch((e) => {
				toast.push(e.message, { duration: 4000 });
			});
	}
</script>

<SidebarLeft bind:open={openCreateTag} title="DODAT ŠTÍTEK">
	<div class="form">
		<Input
			type="text"
			bind:value={addTagInput}
			maxlength={29}
			placeholder="např. tourdeapp"
			label="Název štítku" />
		<Input
			type="text"
			bind:value={description}
			maxlength={29}
			placeholder="např. Programování na soutěž Tour de App"
			label="Popis štítku" />
		<ColorPicker bind:value={color} />
		<Button on:click={handleAdd}>Přidat štítek</Button>
	</div>
</SidebarLeft>
