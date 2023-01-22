<script lang="ts">
	import { tooltip } from '@svelte-plugins/tooltips';
	export let count: number;
</script>

<div
	class="bar"
	use:tooltip={{
		content: `${count} záznam${count !== 1 ? ([2, 3, 4].includes(count) ? 'y' : 'ů') : ''}`,
		position: 'right'
	}}
/>

<style lang="scss">
	.bar {
		width: 100%;
		background-color: $green-primary;
		animation: grow 0.75s forwards;
	}

	@keyframes grow {
		from {
			height: 0;
		}
		to {
			height: var(--bar-height);
		}
	}
</style>
