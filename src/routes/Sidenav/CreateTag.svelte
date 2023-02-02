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
		await createTag(addTagInput, color).catch((e) => {
			console.log({ e });
			toast.push(e.message, { duration: 4000 });
		}); /* 
			if (output == 'shortname') {
				toast.push('Název tagu musí být delší než 2 znaky', { duration: 4000 });
			} else if (output == 'longname') {
				toast.push('Název tagu musí být kratší než 30 znaků', { duration: 4000 });
			} else if (output == 'wrongcolor') {
				toast.push('Špatný formát barvy', { duration: 4000 });
			} else if (output == 'clone') {
				toast.push('Jiný tag má již stejný název', { duration: 4000 });
			} else {
				openCreateTag = false;
				addTagInput = '';
				setBg();
				await invalidate('home');
			}
		} catch (e) {} */
	}
</script>

<SidebarLeft bind:open={openCreateTag} title="DODAT ŠTÍTEK">
	<div class="form">
		<Input
			type="text"
			bind:value={addTagInput}
			maxlength={29}
			placeholder="Jméno štítku"
			label="Název štítku" />
		<ColorPicker bind:value={color} />
		<Button on:click={handleAdd}>Přidat štítek</Button>
	</div>
</SidebarLeft>
