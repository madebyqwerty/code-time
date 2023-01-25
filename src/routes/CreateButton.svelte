<script lang="ts">
	import { scale } from "svelte/transition";


	export let open: boolean;
	export let type = 1;
</script>

<button class="add-button" on:click>
	<div class="vert {open ? 'activated' : ''}" />
	<div class="hor" />
</button>
{#if type==1}
<style lang="scss">
	.vert,
	.hor {
		position: absolute;
		background: $green-primary;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.vert {
		height: 3rem;
		width: 0.4rem;
		transition: 300ms ease;
	}
	.hor {
		height: 0.4rem;
		width: 3rem;
	}

	.add-button {
		position: relative;
		height: 3rem;
		width: 3rem;
	}
	.activated {
		height: 0.3rem;
	}
</style>
{:else}
<style lang="scss">
	.vert,
	.hor {
		position: absolute;
		background: white;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.vert {
		height: 3rem;
		width: 0.4rem;
		transition: 300ms ease;
	}
	.hor {
		height: 0.4rem;
		width: 3rem;
	}

	.add-button {
		position: relative;
		height: 3rem;
		width: 3rem;
		transform:scale(0.91);
	}
	.activated {
		height: 0.3rem;
	}
</style>
{/if}

