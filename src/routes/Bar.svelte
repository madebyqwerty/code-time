<script lang="ts">
	import type { RecordsLanguageOptions } from '$lib/pocketbase/types';
	import { languageColors } from '$lib/utils/languages';
	import { tooltip } from '@svelte-plugins/tooltips';
	export let daysCount: number;
	export let lengthCount: number;
	export let dataLanguages: Record<string, number>;
	export let dataLanguagesTotal: number;

	let percentage: [string, number][] = [];

	Object.entries(dataLanguages).forEach(([name, count]) => {
		percentage.push([name, (count / dataLanguagesTotal) * 100]);
	});

	percentage = percentage.sort((a, b) => b[1] - a[1]);

	console.log(percentage);

	let totalPercentage = 0;
	let gradient = '';
	let topColor;

	percentage.forEach(([name, count], i) => {
		gradient += `${languageColors[name as RecordsLanguageOptions]} ${
			i !== 0 ? `${percentage.at(i - 1)[1]}%` : ''
		} ${totalPercentage + count}%${percentage.length !== i + 1 ? ',' : ''}`;
		totalPercentage += count;
		if (i === 0) {
			topColor = languageColors[name as RecordsLanguageOptions];
		}
	});

	console.log(gradient);
</script>

<div
	class="bar"
	style="--background-color:linear-gradient({gradient});--top-color:{topColor}"
	use:tooltip={{
		content: `${lengthCount} minut${
			lengthCount !== 1 ? ([2, 3, 4].includes(lengthCount) ? 'y' : '') : 'a'
		} <br/>
    ${daysCount} záznam${daysCount !== 1 ? ([2, 3, 4].includes(daysCount) ? 'y' : 'ů') : ''}
    `,
		position: 'left'
	}} />

<style lang="scss">
	.bar {
		width: 100%;
		background: $green-primary;
		animation: grow 0.75s forwards;
		animation-delay: 100ms;
		position: relative;
		transition: 250ms ease;

		&:hover {
			margin-inline-start: 10px;
			margin-inline-end: 20px;

			&::before {
				top: -10px;
				right: -10px;
				width: 100%;
				height: 10px;
				transform: skewX(-45deg);
				transform-origin: top;
				background: var(--top-color);
			}

			&::after {
				top: -5px;
				right: -10px;
				width: 10px;
				height: 100%;
				transform: skewY(-45deg);
				transform-origin: top;
				background: var(--background-color);
			}
		}

		&::before,
		&::after {
			content: '';
			position: absolute;
			transform-origin: top;
			background-color: var(--background-color);
			transition: 250ms cubic-bezier(0.5, 1, 0.89, 1);
			transition-delay: 0ms;
		}

		&::before {
			top: -0px;
			right: 0px;
			width: 100%;
			height: 0px;
			transform: skewX(-45deg);
		}

		&::after {
			top: 0px;
			right: -0px;
			width: -0px;
			height: 100%;
			transform: skewY(-45deg);
		}
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
