<script lang="ts">
	import { languages } from '$lib/utils/languages';
	import type { PageData } from './$types';
	import Table from './Table.svelte';
	import Sidebar from "$lib/components/Sidebar.svelte"
	import Input from "$lib/components/forms/Input.svelte"
	import Button from "$lib/components/Button.svelte"

	export let data: PageData;
	let open=true;
	let selectedOptions:Array;
</script>

<section class="home-page">
	<!-- TODO: Move to it's own file -->
	
	<Sidebar bind:open title="ADD" >
		<div class="create-wrapper ">
			<form class="wrapper" >
				<Input type="text"  placeholder="Naučil jsem se používat print() v Pythonu" label="Popis" />
				<Input
					type="range"
					placeholder="*"
					label="Obtížnost"
				/>
				<Input type="select" label="Jazyky" options={["HTML", "CSS", "JavaScript"]} bind:selectedOptions/>
				<Button>Submit</Button>
			</form>
	</div>
	</Sidebar>
	<section class="content">
		<h2>Záznamy</h2>
		<button class="add-button" on:click={()=>{open=!open}}>
			<div class="vert {open?'activated':''}" />
			<div class="hor" />
		</button>
		<Table records={data.records} />
	</section>
</section>

<style lang="scss">
	.home-page {
		display:flex;
		flex-direction:column;
		justify-content:center;
		align-items:center;
		width: 100vw;
	}

	nav {
		height: 100vh;
		width: 100%;
		border-right: 2px solid $green-primary;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1.6rem;
	}

	.content {
		padding-top: 3.2rem;
text-align:center;
	}
	.vert,.hor{
        position:absolute;
        background:$green-primary;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%)
    }
    .vert{
        height:3rem;
        width:.4rem;
        transition:300ms ease;
    }
    .hor{
        height:.4rem;
        width:3rem;
    }
    .add-button{
        position:relative;
        height:3rem;
        width:3rem;
    }
    .activated{
        height:.3rem;
    }
	h2{
		text-align:center;
	}
</style>
