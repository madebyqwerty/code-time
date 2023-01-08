<script lang="ts">
	import { onMount } from 'svelte';

	export let label: string;
	export let value: string;
	export let type: string;
	export let placeholder: string;
	export let name: string = placeholder;
	export let showPasswordSwitch = false;
	export let helperText: string = '';
	export let error = '';
	export let required = false;
	export let options = [];
	export let selectedOptions: Array;
	let checked = options.map((x)=>{return false});
	let input: HTMLInputElement;
	let mounted: boolean;
	onMount(() => {
		input.type = type;
		mounted = true;
	});
	$:{
		selectedOptions = checked.map((x, i)=>{
			if (x){
				return options[i]
			} else{
				return 0
			}
		}).filter((x)=>{
			return x!=0
		})
	}
	$: {
		if (mounted) {
			input.type = type;
		}
	}

	const switchType = () => {
		type = type === 'password' ? 'text' : 'password';
		console.log(type);
	};
</script>

<span>
	<label for={name} class="text-sm">{label}</label>
	<div class="input-wrapper">
		{#if type=="select"}
		{#each options as o,i}
		<label for={o} class="option">{o}<input class="option-checkbox" type="checkbox" name={o} bind:checked={checked[i]}/><span class="checkmark"></span></label>
			
		{/each}
		{:else}<input
			bind:value
			bind:this={input}
			{required}
			{name}
			{placeholder}
			class="text-base {error ? 'error' : ''}"
		/>{/if}
		

		{#if showPasswordSwitch}
			<button type="button" on:click={switchType} class="icon">
				<iconify-icon icon="carbon:view" width={20} inline={true} />
			</button>
		{/if}
	</div>

	<p class="text-sm grey {error ? 'error' : ''}">{error ? error : helperText}</p>
</span>

<style lang="scss">
	input {
		color: white;
		border: 2px solid $green-primary;
		padding: 1.2rem;
		background: none;
		width: 100%;
		&::-moz-placeholder {
			color: $grey;
		}
		&::placeholder {
			color: $grey;
		}
		&:focus-visible {
			border: 2px solid #90d690;
		}
	}

	.icon {
		color: white;
		position: absolute;
		left: 90%;
		margin-top: 0.2rem;
	}

	.input-wrapper {
		display: flex;
		align-items: center;
		width: 100%;
		position: relative;
	}

	span {
		width: 100%;
	}

	p {
		margin-top: 0.5rem;
	}

	.error {
		color: $red-primary;
		border-color: $red-primary !important;
	}
	.option{
		position:relative;
		&-checkbox{
			position:absolute;
			width:100%;
			height:100%;
		}
	}

</style>
