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
	}}>
	<div class="before" />
</div>

<style lang="scss">
	.bar {
		width: 100%;
		background-color: $green-primary;
		animation: grow 0.75s forwards;
		animation-delay: 100ms;
		position: relative;
		transition: 250ms ease;
	}
	.before {
		width: 100%;
		height: 1px;
		background: white;
		position: absolute;
		bottom: var(--bar-height);
		left: 0;
		animation: dis 0.5s forwards;
		animation-delay: 0.25s;
	}
	.bar:before {
		content: '';
		position: absolute;
		top: -0px;
		right: -4px;
		width: 100%;
		height: 0px;
		transform-origin: top;
		background-color: lightgrey;
		transition: 250ms ease;
	}
	.bar:after {
		content: '';
		position: absolute;
		top: -4px;
		right: -0px;
		width: 00px;
		height: 100%;
		transform-origin: top;
		background-color: lightgrey;
		transition: 250ms ease;
	}
	.bar:hover {
		margin-inline-start: 10px;
		margin-inline-end: 20px;
		transform: translate(-2%, 2%);
	}
	.bar:hover:before {
		content: '';
		position: absolute;
		top: -10px;
		right: -10px;
		width: 100%;
		height: 10px;
		transform: skewX(-45deg);
		transform-origin: top;
		background-color: lightgrey;
	}
	.bar:hover:after {
		content: '';
		position: absolute;
		top: -4px;
		right: -10px;
		width: 10px;
		height: 100%;
		transform: skewY(-45deg);
		transform-origin: top;
		background-color: lightgrey;
	}
	@keyframes dis {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
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
