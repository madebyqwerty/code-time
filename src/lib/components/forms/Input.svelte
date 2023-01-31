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

	let input: HTMLInputElement;
	let mounted: boolean;

	onMount(() => {
		input.type = type;
		mounted = true;
	});

	$: {
		if (mounted) {
			input.type = type;
		}
	}

	const switchType = () => {
		type = type === 'password' ? 'text' : 'password';
	};
</script>

<span>
	<label for={name} class="text-sm">{label}</label>
	<div class="input-wrapper">
		<input
			bind:value
			bind:this={input}
			{required}
			{name}
			{placeholder}
			class="text-base {error ? 'error' : ''}"
		/>

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
		background: transparent;
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
</style>
