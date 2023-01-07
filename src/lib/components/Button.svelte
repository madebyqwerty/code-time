<script lang="ts">
	export let type: 'primary' | 'secondary' = 'primary';
</script>

<button class="{type} text-base" on:click>
	<slot />
</button>

<style lang="scss">
	.primary {
		background: $green-primary;
		border: 2px solid $green-primary;
		transition: 0ms;
		padding: 1.6rem;
		cursor: pointer;
		&:hover {
			background: $ctgreen-500;
			border-color: $ctgreen-500;
		}
		&:active {
			background: none;
			color: $green-primary;
		}
	}

	.secondary {
		background: none;
		border: 2px solid $green-primary;
		transition: 0ms;
		padding: 1.6rem;
		cursor: pointer;
		color: white;
		&:hover {
			border-color: $ctgreen-500;
			color: $ctgreen-500;
		}
		&:active {
			background: $green-primary;
			color: $green-primary;
		}
	}
</style>
