<script lang="ts">
	import Label from './Label.svelte';

	export let id: string;
	export let step = 1;
	export let min = 0;
	export let max = Infinity;
	export let label: string;
</script>

<Label forValue={id}>{label}</Label>
<input type="number" {id} {step} {min} {max} />

<style lang="scss">
	input {
		background-color: $background;
		border: 1px solid $green-primary;
		display: block;
		width: 100%;
		padding: 0.8rem;
	}
</style>
