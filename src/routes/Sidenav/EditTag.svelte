<script lang="ts">
	import SidebarLeft from '$lib/components/SidebarLeft.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import ColorPicker from './ColorPicker.svelte';
	import Button from '$lib/components/Button.svelte';
	import { updateTag } from '$lib/pocketbase/createTag';
	import { toast } from '@zerodevx/svelte-toast';
	import { invalidate } from '$app/navigation';

	export let openEditTag = false;

	export let editedTag = {
		name: '',
		color: '00ff00',
		id: ''
	};

	async function handleEdit() {
		try {
			let output = await updateTag(editedTag.name, editedTag.color, editedTag.id);
			console.log(output);
			if (output == 'shortname') {
				toast.push('Název tagu musí být delší než 2 znaky', { duration: 4000 });
			} else if (output == 'longname') {
				toast.push('Název tagu musí být kratší než 30 znaků', { duration: 4000 });
			} else if (output == 'wrongcolor') {
				toast.push('Špatný formát barvy', { duration: 4000 });
			} else if (output == 'clone') {
				toast.push('Jiný tag má již stejný název', { duration: 4000 });
			} else {
				openEditTag = false;
				editedTag = {
					name: '',
					color: '00ff00',
					id: ''
				};
				await invalidate('home');
			}
		} catch (e) {}
	}
</script>

<SidebarLeft bind:open={openEditTag} title="UPRAVIT ŠTÍTEK">
	<div class="form">
		<Input
			type="text"
			bind:value={editedTag.name}
			maxlength={29}
			placeholder="Jméno štítku"
			label="Název štítku" />
		<ColorPicker bind:value={editedTag.color} />
		<Button on:click={handleEdit}>Upravit štítek</Button>
	</div>
</SidebarLeft>
