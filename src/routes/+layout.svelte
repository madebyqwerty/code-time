<script>
	import '../app.scss';
	import 'iconify-icon';

	import { SvelteToast, toast } from '@zerodevx/svelte-toast';
	import Button from '$lib/components/Button.svelte';

</script>

<main class="text-base">
	<slot />
</main>
<div class="toast-wrap">
	<SvelteToast options={{ reversed: true, intro: { y: 50 } }} />
</div>
<style lang="scss">
	main {
		color: $green-lightest;
	}
	:root {
		--toastContainerTop: auto;
		--toastContainerRight: auto;
		--toastContainerBottom: 2rem;
		--toastContainerLeft: calc(50vw - 8rem);
		--toastBackground: lighten($background, 5);
		--toastBarHeight: 0;
	}
	:global(._toastItem) {
		border-width: 2px !important;
		border-style: solid !important;
		padding-left: 8px !important;
		padding-right: 8px !important;
	}
	:global(.ikonka) {
		display: inline-block !important;
		height: 100% !important;
	}
	:global(._toastMsg) {
		padding: 0 !important;
	}
</style>
