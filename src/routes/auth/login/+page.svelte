<script lang="ts">
	import Wrapper from '../Wrapper.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	import { pb } from '$lib/pocketbase';
	import * as RD from '@devexperts/remote-data-ts';
	import RemoteDataRenderer from '$lib/components/RemoteDataRenderer.svelte';
	import type { ClientResponseError, Record, RecordAuthResponse } from 'pocketbase';
	import type { UsersRecord } from '$lib/pocketbase/types';
	import { getTranslation } from '$lib/pocketbase/translate-error';
	import { goto, invalidateAll } from '$app/navigation';

	let email: string,
		password: string = '';

	let formState: RD.RemoteData<ClientResponseError, RecordAuthResponse<UsersRecord>> = RD.initial;
	$: disabled = !RD.isInitial(formState) && !RD.isFailure(formState);

	function login() {
		formState = RD.pending;

		pb.collection('users')
			.authWithPassword<UsersRecord>(email, password, { $autoCancel: false })
			.then(data => {
				formState = RD.success(data);
			})
			.catch(err => {
				formState = RD.failure(err);
			});
	}
</script>

<Wrapper type={1}>
	<h1 class="width-max white">LOGIN</h1>
	<a class="text-base grey grey-hover" href="/auth/register"
		>Ještě nemáte účet? Kliknutím zde si ho vytvořte</a>
	<form on:submit|preventDefault={login} on:change={() => (formState = RD.initial)}>
		<Input
			type="text"
			bind:value={email}
			placeholder="jmeno@priklad.cz"
			label="E-mail"
			{disabled} />
		<Input
			type="password"
			bind:value={password}
			placeholder="************"
			showPasswordSwitch={true}
			label="Heslo"
			{disabled} />
		<RemoteDataRenderer rd={formState}>
			<Button slot="initial">Přihlásit se</Button>
			<p class="red" slot="failure" let:error>{getTranslation(error.message)}</p>
			<Button
				slot="success"
				on:click={async () => {
					await invalidateAll();
					await goto('/');
				}}>Pokračovat</Button>
		</RemoteDataRenderer>
	</form>
</Wrapper>

<style lang="scss">
	form {
		width: 100%;
	}
</style>
