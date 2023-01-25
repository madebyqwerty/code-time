<script lang="ts">
	import Checkbox from './Checkbox.svelte';
	import CreateButton from '../CreateButton.svelte';
	import { tagStore } from '$lib/pocketbase/tagStore';
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import SidebarLeft from '$lib/components/SidebarLeft.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import { createTag } from '$lib/pocketbase/createTag.ts';
	import ColorPicker from './ColorPicker.svelte';

	$: tagsSearchParam = $page.url.searchParams.get('tags');
	$: selectedTags = tagsSearchParam ? JSON.parse(tagsSearchParam) : [];
	let openTags = false;
	let editTag = false;
	let addTagInput:string;
	let edited;
	let searchInput: string;
	let color;

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
		invalidate('home');
	}

	const setBg = () => {
		const randomColor = Math.floor(Math.random()*160+47).toString(16)+Math.floor(Math.random()*160+47).toString(16)+Math.floor(Math.random()*160+47).toString(16);
		let n = 6 - randomColor.length;
		color = '#' + '0'.repeat(n) + randomColor;
	};
	setBg();
	async function handleAdd() {
		try{
			if (addTagInput.length>2&&addTagInput.length<30&&parseInt(color.slice(1),12)<2985983){
				createTag(addTagInput,color);
			}
		} catch(e){}
		
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
			}}
		/>
	</div>

	{#each $tagStore as tag (tag.id)}
		<div class="tag">
			<div class="tag-text">
				<Checkbox
					active={selectedTags.includes(tag.id)}
					--bg={tag.color}
					on:check={(e) => handleTagChange(tag.id, e.detail)}
				/>{tag.name}
			</div>
			<div class="tag-icons">
				<button
					on:click={() => {
						editTag = !editTag;
						edited = tag;
					}}
					class="tag-icon"
					>...
				</button>
			</div>
		</div>
	{/each}
</section>
<SidebarLeft bind:open={openTags} title="DODAT ŠTÍTEK">
	<form on:submit|preventDefault={handleAdd}>
		<Input type="text" bind:value={addTagInput} placeholder="Jméno štítku" label="Název štítku" />
		<ColorPicker bind:value={color}/>
		<Button>Přidat štítek</Button>
	</form>
	{#each $tagStore as tag (tag.id)}
		<div class="tag">
			<div class="tag-text">
				<Checkbox
					active={selectedTags.includes(tag.id)}
					--bg={tag.color}
					on:check={(e) => handleTagChange(tag.id, e.detail)}
				/>{tag.name}
			</div>
			<div class="tag-icons">
				<button
					on:click={() => {
						editTag = !editTag;
						edited = tag;
					}}
					class="tag-icon"
					>...
				</button>
			</div>
		</div>
	{/each}
</SidebarLeft>
<SidebarLeft bind:open={editTag} title="UPRAVIT ŠTÍTEK" />

<style lang="scss">
	h3 {
		color: white;
	}
	g {
		stroke-width: 1;
	}
	path {
		fill: white;
	}
	.headerlmao {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
	}
	.icon {
		height: 2.5rem;
		width: 2.5rem;
		font-size: 4rem;
		line-height: 2.5rem;
		color: white;
	}
	svg {
		height: 2.5rem;
		width: 2.5rem;
	}
	.tag {
		padding: 0.4rem;
		color: white;
		display: flex;
		gap: 0.8rem;
		align-items: center;
		justify-content: space-between;
		& svg,
		&-icon {
			height: 1.6rem;
			width: 1.6rem;
			opacity: 0;
		}
		&:hover svg,
		&:hover &-icon {
			opacity: 1;
		}
	}

	section {
		@include nav-section;
	}
</style>
