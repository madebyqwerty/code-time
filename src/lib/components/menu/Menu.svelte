<script>
	import { Menu, MenuButton, MenuItems } from '@rgossiaux/svelte-headlessui';

	let menuButtonWidth = 0;
</script>

<Menu let:open>
	<MenuButton>
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

	.manager-add-button {
		padding-top: 0.8rem;
		display: block;
		& > .divider {
			margin-left: 10%;
			margin-right: 10%;
			height: 1px;
			margin-bottom: 1.6rem;
			background-color: lighten($light-background, 10);
		}
		& > .content {
			display: flex;
			align-items: center;
			gap: 0.8rem;
		}
	}
</style>
