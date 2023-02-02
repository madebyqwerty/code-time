<script lang="ts">
	import Checkbox from './Checkbox.svelte';
	import CreateButton from '../CreateButton.svelte';
	import { tagStore } from '$lib/pocketbase/tagStore';
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import SidebarLeft from '$lib/components/SidebarLeft.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import { createTag, updateTag } from '$lib/pocketbase/createTag';
	import ColorPicker from './ColorPicker.svelte';
	import { toast } from '@zerodevx/svelte-toast';

	$: tagsSearchParam = $page.url.searchParams.get('tags');
	$: selectedTags = tagsSearchParam ? JSON.parse(tagsSearchParam) : [];
	$: $tagStore.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

	let openTags = false;
	let editTag = false;
	let addTagInput: string = '';
	let color: string;
	let editedTag = {
		name: '',
		color: '00ff00',
		id: ''
	};

	async function handleTagChange(id: string, checked: boolean) {
		if (checked) {
			$page.url.searchParams.set('tags', JSON.stringify([...selectedTags, id]));
		} else {
			$page.url.searchParams.set(
				'tags',
				JSON.stringify(selectedTags.filter((e: string) => e !== id))
			);
		}

		await goto($page.url);
		console.log('tags 1');
		await invalidate('home');
	}

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
		try {
			let output = await createTag(addTagInput, color);
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
				openTags = false;
				addTagInput = '';
				setBg();
				await invalidate('home');
			}
		} catch (e) {}
	}
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
				editTag = false;
				editedTag = {
					name: '',
					color: '00ff00',
					id: ''
				};
				setBg();
				await invalidate('home');
			}
		} catch (e) {}
	}
</script>

<section>
	<div class="headerlmao">
		<h3>Štítky</h3>
		<CreateButton
			type={2}
			bind:open={openTags}
			on:click={() => {
				openTags = !openTags;
			}} />
	</div>

	{#each $tagStore as tag (tag.id)}
		<div class="tag">
			<div class="tag-text">
				<Checkbox
					active={selectedTags.includes(tag.id)}
					--bg={tag.color}
					on:check={(e) => handleTagChange(tag.id, e.detail)}>{tag.name}</Checkbox>
			</div>
			<div class="tag-icons">
				<button
					on:click={() => {
						editTag = !editTag;
						editedTag = {
							name: tag.name,
							color: tag.color,
							id: tag.id
						};
					}}
					class="tag-icon"
					><div class="dot" />
					<div class="dot" />
					<div class="dot" />
				</button>
			</div>
		</div>
	{/each}
</section>
<SidebarLeft bind:open={openTags} title="DODAT ŠTÍTEK">
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
	{#each $tagStore as tag (tag.id)}
		<div class="tag">
			<div class="tag-text">
				<Checkbox
					active={selectedTags.includes(tag.id)}
					--bg={tag.color}
					on:check={(e) => handleTagChange(tag.id, e.detail)}>{tag.name}</Checkbox>
			</div>
			<div class="tag-icons">
				<button
					on:click={() => {
						editTag = !editTag;
						editedTag = {
							name: tag.name,
							color: tag.color,
							id: tag.id
						};
					}}
					class="tag-icon"
					><div class="dot" />
					<div class="dot" />
					<div class="dot" />
				</button>
			</div>
		</div>
	{/each}
</SidebarLeft>
<SidebarLeft bind:open={editTag} title="UPRAVIT ŠTÍTEK">
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

<style lang="scss">
	h3 {
		color: white;
	}

	.headerlmao {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
	}

	.dot {
		height: 4px;
		width: 4px;
		background: white;
		border-radius: 5px;
	}
	.tag {
		padding: 0.4rem;
		color: white;
		display: flex;
		gap: 0.8rem;
		align-items: center;
		justify-content: space-between;
		transition: 100ms ease;

		&-text {
			gap: 0.8rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		&-icon {
			height: 2rem;
			width: 2rem;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			opacity: 0;
			padding-right: 0.2rem;
			transition: 100ms ease;
		}

		&:hover &-icon {
			opacity: 1;
		}
		&:hover {
			background-color: #ffffff03;
		}
	}

	section {
		@include nav-section;
	}
</style>
