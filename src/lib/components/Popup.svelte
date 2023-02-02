<script lang="ts">
	import Checkbox from '$lib/components/Checkbox.svelte';
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { openEditTag, selectedTags, editedTag  } from '$lib/utils/SidebarStores.ts';
	

	export let name: string;
	export let color: string;
	export let id: string;
	export let description: string;
	export let open: boolean;

	function clickOutside(node) {
		const handleClick = (event) => {
			if (node && !node.contains(event.target) && !event.defaultPrevented) {
				node.dispatchEvent(new CustomEvent('click_outside', node));
			}
		};

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}

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
</script>

{#if open}
	<div class="mcwrap" on:mouseover={()=>{open=true}}>
        <div
            class="popup" on:mouseover={()=>{open=true}}>
            <div class="tag" on:mouseover={()=>{open=true}}>
                <div class="tag-text">
                    <Checkbox
                        active={$selectedTags.includes(id)}
                        --bg={color}
                        on:check={(e) => handleTagChange(id, e.detail)}>{name}</Checkbox>
                </div>
                <div class="tag-icons">
                    <button
                        on:click={() => {
                            openEditTag.set(true);
                            editedTag.set({
                                name: name,
                                color: color,
                                id: id
                            });
                        }}
                        class="tag-icon"
                        ><div class="dot" />
                        <div class="dot" />
                        <div class="dot" />
                    </button>
                </div>
            </div>
            <div class="tag-description">{description}</div>
            <div class="tag-arrow" />
        </div>
    </div>
{/if}

<style lang="scss">
    .mcwrap{
        padding-bottom:1rem;
        padding-bottom:2rem;
        padding-left:100%;
        padding-right:100%;
        position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
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
	.tag- {
		&name {
		}
		&arrow {
			position: absolute;
			width: 0;
			height: 0;
			border-style: solid;
			border-width: 10px 10px 0 10px;
			border-color: lighten($background, 15) transparent transparent;
			bottom: 0;
			left: 50%;
			transform: translate(-50%, 100%);
		}
	}
	.popup {
		position:absolute;
        bottom:100%;
        left:50%;
        transform:translateX(-50%);
		background: lighten($background, 20);
		border: 2px solid lighten($background, 15);
		padding: 0.8rem;
		border-radius: 0.5rem;
	}
</style>
