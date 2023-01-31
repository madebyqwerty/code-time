<script>
	import { Menu, MenuButton, MenuItems } from '@rgossiaux/svelte-headlessui';

	let menuButtonWidth = 0;
</script>

<Menu let:open style="width: 100%;">
	<MenuButton style="width: 100%;">
		<div class="menu-button" bind:clientWidth={menuButtonWidth}>
			<div class="content">
				<slot name="menu-button" />
			</div>
			<iconify-icon icon={'pixelarticons:chevron-down'} class:open class:closed={!open} />
		</div>
	</MenuButton>
	<span style="display:relative;">
		<div class="menu-items" style="width: {menuButtonWidth}px; overflow:hidden;">
			<MenuItems>
				<slot name="menu-items" />
			</MenuItems>
		</div>
	</span>
</Menu>

<style lang="scss">
	$light-background: lighten($background, 10);

	.menu-button {
		@include menu-child();
		justify-content: space-between;
		background-color: $light-background;
		width: 100%;

		& > .content {
			display: flex;
			align-items: center;
			gap: 10px;
		}
	}

	iconify-icon {
		transition: all 300ms;
	}

	.open {
		transform: rotate(180deg);
	}

	.menu-items {
		position: absolute;
		width: 100%;
		z-index: 10;
	}
</style>
