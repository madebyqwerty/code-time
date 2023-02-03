<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { pb } from '$lib/pocketbase';
	import { userStore } from '$lib/pocketbase/userStore';
	import { page } from '$app/stores';
	import { tooltip } from '@svelte-plugins/tooltips';
	import { toast } from '@zerodevx/svelte-toast';

	export let open: boolean;

	async function deleteUser(id: string) {
		const url = $page.url;
		url.searchParams.set('user_id', JSON.stringify(0));

		pb.collection('users').delete(id, { $$autoCancel: false });
		await goto(url);
		await invalidate('home');

		open = false;
	}

	function updateUser(id: string, name: string) {
		console.log('udpated', id, 'with', name);

		if ($userStore.filter((user) => user.id === id)[0].name === name) {
			toast.push('Nic jste nezměnili');
			return;
		}

		pb.collection('users')
			.update(id, { name })
			.then(async () => {
				open = false;
				await invalidate('home');
			})
			.catch(() => {
				toast.push('Něco se pokazilo zkuste to znovu');
			});
	}

	let newInfo = $userStore.map((user) => {
		return { name: user.name!, email: user.email, id: user.id };
	});
</script>

<Sidebar bind:open title="Spravovat uživatele">
	<div class="user-wrapper">
		{#each newInfo as user}
			<div class="user">
				<span>
					<strong>
						<input bind:value={user.name} placeholder="Nové jméno" type="text" class="name" />
					</strong><br />
					<span
						use:tooltip={{
							content: 'Z bezpečtnostních důvodů email nejde změnit'
						}}>{user.email}</span>
				</span>
				<div class="button-wrapper">
					<button on:click={() => updateUser(user.id, user.name)} class="edit">
						<iconify-icon icon="pixelarticons:edit" width={20} />
					</button>
					<button on:click={() => deleteUser(user.id)} class="delete">
						<iconify-icon icon="pixelarticons:trash" width={20} />
					</button>
				</div>
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
		& > .button-wrapper {
			display: flex;
			gap: 0px;
			& > button {
				padding: 0.8rem;
				height: 100px;

				&.delete {
					background-color: $red-darkest;
					& > iconify-icon {
						color: $red-light;
					}
				}

				&.edit {
					background-color: $blue-darkest;
					& > iconify-icon {
						color: $blue-light;
					}
				}

				&:hover {
					&.delete {
						background-color: $red-darker;
						& > iconify-icon {
							color: $red-lightest;
						}
					}

					&.edit {
						background-color: $blue-darker;
						& > iconify-icon {
							color: $blue-lightest;
						}
					}
				}
			}
		}
	}

	.user-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1.6rem;
	}
	input {
		background: $background-light;
		border-bottom: 1px solid $green-primary;
		margin-bottom: 1.2rem;
	}

	input.name {
		@include text-lg;
	}
</style>
