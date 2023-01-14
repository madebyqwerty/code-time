<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';

	export let open: boolean;
	export let title: string;

	let width;

	const dispatch = createEventDispatcher();

	const close = () => {
		console.log('closing');
		open = false;
	};
</script>

{#if open}
	<span>
		<div
			class="overlay"
			transition:fade={{ duration: 500, easing: cubicOut }}
			on:click={close}
			on:keydown={close}
		/>
		<aside
			bind:clientWidth={width}
			transition:fly={{ duration: 500, x: width, y: 0, opacity: 0.5, easing: cubicOut }}
		>
			<Button on:click={close} type="close">
				<iconify-icon icon="carbon:close-outline" inline={true} class="icon" />
				Zavřít
			</Button>
			<h1>{title}</h1>
			<slot />
		</aside>
	</span>
{/if}

<style lang="scss">
	span {
		position: fixed;
		top: 0px;
		right: 0px;
		bottom: 0px;
		left: 0px;
		display: grid;
		place-items: end;
	}

	.overlay {
		position: fixed;
		height: 100vh;
		width: 100vw;
		background: rgba(0, 0, 0, 0.5);
	}

	aside {
		z-index: 20;
		height: 100vh;
		width: 42%;
		background: $background;
		padding: 3.2rem;
		overflow-y: scroll;
	}

	iconify-icon {
		scale: 150%;
	}
</style>
