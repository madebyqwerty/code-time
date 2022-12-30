<script lang="ts">
	import { goto } from '$app/navigation';
	import { login, pb } from '$lib/pocketbase';

	let email: string, password: string, repeatPassword: string, name: string;

	async function register() {
		const createdUser = await pb.collection('users').create({
			email,
			password,
			passwordConfirm: repeatPassword,
			name
		});

		await login(email, password);
		goto('/');
	}
</script>

<form action="" on:submit={register}>
	<input type="text" placeholder="Name" bind:value={name} />
	<input type="email" placeholder="E-mail" bind:value={email} />
	<input type="text" placeholder="Heslo" bind:value={password} />
	<div class="text-slate-700">Password must be atleast 12 characters long</div>
	<input type="text" placeholder="Zopakujte heslo" bind:value={repeatPassword} />
	<button>Login</button>
</form>
