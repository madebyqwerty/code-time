<script>
	import { MenuItem } from '@rgossiaux/svelte-headlessui';
</script>

<MenuItem let:active as="div">
	<button class="menu-item" on:click class:active>
		<slot />
	</button>
</MenuItem>

<style lang="scss">
	.menu-item {
		@include menu-child();
		justify-content: start;
		background-color: lighten($background, 5);
		&.active {
			background-color: $green-primary;
			color: $background;
		}
	}
</style>
