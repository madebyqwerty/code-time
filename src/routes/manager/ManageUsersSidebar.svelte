<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { pb } from '$lib/pocketbase';
	import { userStore } from '$lib/pocketbase/userStore';
	import { page } from '$app/stores';

	export let open: boolean;

	async function deleteUser(id: string) {
		const url = $page.url;
		url.searchParams.set('user_id', JSON.stringify(0));

		pb.collection('users').delete(id);
		await goto(url);
		await invalidate('home');
		open = false;
	}
</script>

<Sidebar bind:open title="Spravovat uživatele">
	<div class="user-wrapper">
		{#each $userStore as user}
			<div class="user">
				<span>
					<strong>{user.name}</strong> <br />
					{user.email}
				</span>
				<button on:click={() => deleteUser(user.id)}>
					<iconify-icon icon="pixelarticons:trash" width={20} />
				</button>
			</div>
		{/each}
	</div>
</Sidebar>

<style lang="scss">
	.user {
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: space-between;
		background-color: $background-light;
		& > span {
			padding: 0.8rem 1.6rem;
		}
		& > button {
			padding: 0.8rem;
			background-color: $red-darkest;
			height: 100px;

			&:hover {
				background-color: $red-darker;
				& > iconify-icon {
					color: $red-lightest;
				}
			}
			& > iconify-icon {
				color: $red-light;
			}
		}
	}

	.user-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1.6rem;
	}
</style>
