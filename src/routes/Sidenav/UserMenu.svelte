<script lang="ts">
	import { Menu, MenuButton, MenuItems, MenuItem } from '@rgossiaux/svelte-headlessui';
	import { currentUser } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
</script>

<section>
	<h3>Uživatel</h3>
	<Menu let:open style="width: 100%;">
		<MenuButton style="width: 100%;">
			<div class="menu-button">
				<span>
					<iconify-icon icon="mdi:account-circle" />{$currentUser.name}
				</span>
				<iconify-icon icon={'pixelarticons:chevron-down'} class:open class:closed={!open} />
			</div>
		</MenuButton>
		<MenuItems>
			<span style="display: relative;">
				<div class="menu-items">
					<MenuItem as="div">
						<button
							class="menu-button menu-item"
							on:click={() => {
								goto('/auth/logout');
							}}
						>
							<iconify-icon icon="pixelarticons:logout" />Odhlásit se
						</button>
					</MenuItem>
				</div>
			</span>
		</MenuItems>
	</Menu>
</section>

<style lang="scss">
	$light-background: lighten($background, 10);

	.menu-button {
		padding: 0.8rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		width: 100%;
		background-color: $light-background;
		& > span {
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

	.menu-item {
		justify-content: start;
	}

	.menu-items {
		position: absolute;
		background-color: $light-background;
		width: 92%;
	}
</style>
