<script lang="ts">
	import { goto } from '$app/navigation';
	import { login } from '$lib/pocketbase';
	import Wrapper from '../Wrapper.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/forms/Input.svelte';

	let email: string, password: string;
</script>

<section class="section-default">
    <div>
        <a class="text-base green green-hover width-max" href="/">cd ~/domov</a>
        <form class="wrapper">
            <h1 class="width-max white">LOGIN</h1>
            <a class="text-base grey grey-hover" href="/auth/register">Ještě nemáte účet? Zde si ho vytvořte</a>
            <Input type="text" bind:value={email} placeholder="E-mail" />
			<Input type="password" bind:value={password} placeholder="Heslo" />
            <button class="button-default text-base">Přihlásit se</button>
        </form>
    </div>
</section>
