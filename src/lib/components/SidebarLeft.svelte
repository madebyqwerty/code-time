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
		<aside
			bind:clientWidth={width}
			transition:fly={{ duration: 500, x: -width, y: 0, opacity: 1, easing: cubicOut }}
		>
			<Button on:click={close} type="close2">&#60; Zavřít</Button>
			<h3>{title}</h3>
			<slot />
		</aside>
	</span>
{/if}

<style lang="scss">
	h3 {
		line-height: 300%;
		color: white;
	}
	span {
		position: fixed;
		top: 0px;
		right: 0px;
		bottom: 0px;
		left: 0px;
		display: grid;
		place-items: start;
	}

	aside {
		z-index: 20;
		height: 100vh;
		width: 400px;
		background: $background;
		padding: 3.2rem;
		overflow-y: scroll;
	}
</style>
