<script lang="ts">
	import CreateButton from './CreateButton.svelte';
	import CreateRecord from './CreateRecord.svelte';
	import { recordsStore } from '$lib/pocketbase/recordsStore';
	import { tagStore } from '$lib/pocketbase/tagStore';
	import Button from '$lib/components/Button.svelte';
	import type { Records } from '$lib/pocketbase/recordsStore';
	import TableRow from './TableRow.svelte';

	let open = false;
	let sortedData = $recordsStore;

	function lighten(c: string, n: number): string {
		c = c.slice(1);
		let r = parseInt(c.substring(0, 2), 16);
		let g = parseInt(c.substring(2, 4), 16);
		let b = parseInt(c.substring(4, 6), 16);

		r = Math.round(r * (1 + n / 100));
		g = Math.round(g * (1 + n / 100));
		b = Math.round(b * (1 + n / 100));

		r = Math.max(0, Math.min(255, r));
		g = Math.max(0, Math.min(255, g));
		b = Math.max(0, Math.min(255, b));

		let shadeR = r.toString(16).padStart(2, '0');
		let shadeG = g.toString(16).padStart(2, '0');
		let shadeB = b.toString(16).padStart(2, '0');

		return '#' + shadeR + shadeG + shadeB;
	}

	interface SortingFunctions {
		newest: () => Records[];
		oldest: () => Records[];
		hardest: () => Records[];
		easiest: () => Records[];
		shortest: () => Records[];
		longest: () => Records[];
	}

	const sortingFunctions = {
		newest: (d:array) => d.sort((a, b) => b.date.getTime() - a.date.getTime()),
		oldest: (d:array) => d.sort((a, b) => a.date.getTime() - b.date.getTime()),
		hardest: (d:array) => d.sort((a, b) => b.rating - a.rating),
		easiest: (d:array) => d.sort((a, b) => a.rating - b.rating),
		shortest: (d:array) => d.sort((a, b) => a.length - b.length),
		longest: (d:array) => d.sort((a, b) => b.length - a.length)
	};

	let selected: keyof SortingFunctions = 'newest';
	$: {sortedData = sortingFunctions[selected]($recordsStore);console.log("change");}
</script>

<section>
	<header>
		<h2>Záznamy</h2>
		<CreateButton
			on:click={() => {
				open = !open;
			}}
			{open} />
	</header>

	<table class="table-default sortable">
		<colgroup>
			<col class="table-date" />
			<col class="table-length" />
			<col class="table-diff" />
			<col class="table-langs" />
			<col class="table-tags" />
		</colgroup>
		<thead>
			<tr>
				<th>
					<button
						on:click={() => {
							if (selected == 'newest') {
								selected = 'oldest';
							} else {
								selected = 'newest';
							}
						}}>
						<h4>Datum</h4>
						<div class="arrows">
							<iconify-icon
								icon="pixelarticons:play"
								class:selected={selected == 'oldest'}
								class:inactive={selected !== 'oldest'}
								inline={true}
								class="up"
								width={20} />
							<iconify-icon
								icon="pixelarticons:play"
								class:selected={selected == 'newest'}
								class:inactive={selected !== 'newest'}
								class="down"
								inline={true}
								width={20} />
						</div>
					</button>
				</th>
				<th>
					<button
						on:click={() => {
							if (selected == 'longest') {
								selected = 'shortest';
							} else {
								selected = 'longest';
							}
						}}>
						<h4>Délka</h4>
						<div class="arrows">
							<iconify-icon
								icon="pixelarticons:play"
								class:selected={selected == 'shortest'}
								class:inactive={selected !== 'shortest'}
								inline={true}
								class="up"
								width={20} />
							<iconify-icon
								icon="pixelarticons:play"
								class:selected={selected == 'longest'}
								class:inactive={selected !== 'longest'}
								class="down"
								inline={true}
								width={20} />
						</div>
					</button>
				</th>
				<th>
					<button
						on:click={() => {
							if (selected == 'hardest') {
								selected = 'easiest';
							} else {
								selected = 'hardest';
							}
						}}>
						<h4>Obtížnost</h4>
						<div class="arrows">
							<iconify-icon
								icon="pixelarticons:play"
								class:selected={selected == 'easiest'}
								class:inactive={selected !== 'easiest'}
								inline={true}
								class="up"
								width={20} />
							<iconify-icon
								icon="pixelarticons:play"
								class:selected={selected == 'hardest'}
								class:inactive={selected !== 'hardest'}
								class="down"
								inline={true}
								width={20} />
						</div>
					</button>
				</th>
				<th><h4>Jazyky</h4></th>
				<th><h4>Tagy</h4></th>
			</tr>
		</thead>
		<tbody>
			{#key sortedData}
				{#each sortedData as record, i}
					<TableRow {record} {i} />
				{/each}
			{/key}
		</tbody>
	</table>

	{#if $recordsStore.length < 1}
		<div class="no-data">
			<h4>Nenašli jsme žádný záznam</h4>
			<Button on:click={() => (open = true)}>Přidat nový</Button>
		</div>
	{/if}

	<CreateRecord bind:open />
</section>

<style lang="scss">
	.no-data {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 2rem;
		padding-top: 2rem;
		gap: 2rem;
		& > h4 {
			font-family: 'Fira Code', monospace;
		}
	}

	table {
		width: 100%;
		margin-bottom: 8rem;
		table-layout: fixed;
	}

	.table {
		&-date {
			width: 13rem;
		}
		&-length {
			width: 13rem;
		}
		&-diff {
			width: 20rem;
		}
	}

	@keyframes appear {
		from {
			transform: translate(0, 20%);
		}
		to {
			transform: translate(0, 0);
			opacity: 100;
		}
	}

	:global(tr:nth-of-type(odd)) {
		background: lighten($background, 5);
	}

	th {
		padding-bottom: 2rem;
		padding-top: 2rem;
		border-bottom: 1px solid $green-primary;
	}

	h4 {
		color: white;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	th > button {
		display: flex;
		padding: 0 1rem;
		align-items: center;
		gap: 4px;
	}

	.arrows {
		height: 40px;
		display: flex;
		flex-direction: column;
		gap: 1px;
		padding-top: 10px;

		& > * {
			margin-bottom: -5px;
			margin-top: -5px;
		}

		& > .selected {
			color: white;
		}

		& > .inactive {
			color: lighten($background, 20);
		}

		& > .up {
			transform: rotate(-90deg);
		}

		& > .down {
			transform: rotate(90deg);
		}
	}
</style>
