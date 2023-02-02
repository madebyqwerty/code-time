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
		await updateTag(editedTag.name, editedTag.color, editedTag.id)
			.then(async () => {
				openEditTag = false;
				editedTag = {
					name: '',
					color: '00ff00',
					id: ''
				};
				await invalidate('home');
			})
			.catch((e: Error) => {
				toast.push(e.message, { duration: 4000 });
			});
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
