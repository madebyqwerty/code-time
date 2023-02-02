<script lang="ts">
	export let label: string;
	export let value: string | undefined;
	export let placeholder: string;
	export let name: string = placeholder;
	export let helperText: string = '';
	export let error = '';
	export let required = false;
</script>

<span>
	<label for={name} class="text-sm">{label}</label>
	<div class="input-wrapper">
		<textarea {name} bind:value {placeholder} {required} rows="4" />
	</div>

	<p class="text-sm grey {error ? 'error' : ''}">{error ? error : helperText}</p>
</span>

<style lang="scss">
	textarea {
		color: white;
		border: 2px solid $green-primary;
		padding: 1.2rem;
		background: transparent;
		width: 100%;
		min-height: 4.8rem;
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
