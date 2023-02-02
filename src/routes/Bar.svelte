<script lang="ts">
	import { tooltip } from '@svelte-plugins/tooltips';
	export let daysCount: number;
	export let lengthCount: number;
</script>

<div
	class="bar"
	use:tooltip={{
		content: `${lengthCount} minut${
			lengthCount !== 1 ? ([2, 3, 4].includes(lengthCount) ? 'y' : '') : 'a'
		} <br/>
    ${daysCount} záznam${daysCount !== 1 ? ([2, 3, 4].includes(daysCount) ? 'y' : 'ů') : ''}
    `,
		position: 'right'
	}} />

<style lang="scss">
	.bar {
		width: 100%;
		background-color: $green-primary;
		animation: grow 0.75s forwards;
		animation-delay: 100ms;
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
