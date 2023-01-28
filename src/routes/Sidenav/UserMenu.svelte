<script lang="ts">
	import { currentUser } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import Menu from '$lib/components/menu/Menu.svelte';
	import MenuItem from '$lib/components/menu/MenuItem.svelte';
</script>

<section>
	<h3>Uživatel</h3>
	<Menu>
		<div slot="menu-button" class="menu-button">
			<iconify-icon icon="mdi:account-circle" />{$currentUser.name}
		</div>
		<div slot="menu-items">
			<MenuItem
				on:click={() => {
					goto('/auth/logout');
				}}
			>
				<iconify-icon icon="pixelarticons:logout" />Odhlásit se
			</MenuItem>
		</div>
	</Menu>
</section>

<style lang="scss">
	.menu-button {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
</style>
