<script lang="ts">
	export let open: boolean;
</script>

<button class="add-button" on:click>
	<div class="vert {open ? 'activated' : ''}" />
	<div class="hor" />
</button>

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
