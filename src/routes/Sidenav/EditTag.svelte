<script lang="ts">
	import SidebarLeft from '$lib/components/SidebarLeft.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import ColorPicker from './ColorPicker.svelte';
	import Button from '$lib/components/Button.svelte';
	import { updateTag, deleteTag } from '$lib/pocketbase/createTag';
	import { toast } from '@zerodevx/svelte-toast';
	import { invalidate } from '$app/navigation';
	import Textarea from '$lib/components/forms/Textarea.svelte';

	export let openEditTag = false;

	export let editedTag = {
		name: '',
		color: '00ff00',
		description: '',
		id: ''
	};

	async function handleEdit() {
		await updateTag(editedTag.name, editedTag.color, editedTag.description, editedTag.id)
			.then(async () => {
				openEditTag = false;
				editedTag = {
					name: '',
					color: '00ff00',
					description: '',
					id: ''
				};
				await invalidate('home');
			})
			.catch((e: Error) => {
				toast.push(e.message, { duration: 4000 });
			});
	}
	async function handleDelete() {
		await deleteTag(editedTag.id)
			.then(async () => {
				await invalidate('home');

				openEditTag = false;
			})
			.catch((e: Error) => toast.push(e.message));
	}
</script>

<SidebarLeft bind:open={openEditTag} title="UPRAVIT ŠTÍTEK">
	<div class="form">
		<Input
			type="text"
			bind:value={editedTag.name}
			maxlength={29}
			placeholder="např. tourdeapp"
			label="Název štítku" />
		<Textarea
			bind:value={editedTag.description}
			placeholder="např. Programování na soutěž Tour de App"
			label="Popis štítku" />
		<ColorPicker bind:value={editedTag.color} />
		<div class="space-between">
			<Button on:click={handleEdit}>Upravit štítek</Button><Button
				type="close"
				on:click={handleDelete}
				><iconify-icon icon="pixelarticons:trash" class="down" inline={true} width={20} /></Button>
		</div>
	</div>
</SidebarLeft>

<style>
	.space-between {
		display: flex;
		flex-direction: row;
		gap: 2rem;
	}
</style>
