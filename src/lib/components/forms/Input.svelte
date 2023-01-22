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
		console.log(type);
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
	.eye,
	.square {
		height: 0.7rem;
		width: 0.7rem;
		background: $green-primary;
		position: absolute;
	}
	.mth {
		height: 0.7rem;
		width: 2.1rem;
		background: $green-primary;
		position: absolute;
		top: 68%;
		left: 20%;
	}
	.eye {
		top: 0%;
		left: 80%;
		&:first-child {
			left: 0%;
		}
	}
	.square {
		&:first-child {
			left: 0%;
		}
		&:last-child {
			left: 80%;
		}
	}
	.range-label {
		display: flex;
		flex-direction: row;
		gap: 3rem;
		align-items: flex-end;
		padding-top: 2rem;
	}
	.smile {
		position: relative;
		height: 3.5rem;
		width: 3.5rem;
	}

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
		&2 {
			flex-direction: column;
		}
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
