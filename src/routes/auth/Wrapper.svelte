<section class="section-default">
	<div>
		<a class="text-base green green-hover width-max" href="/">cd ~/</a>
		<slot />
	</div>
</section>

<style lang="scss">
	.section-default {
		@include center;
		width: 100vw;
		height: 100vh;
	}
</style>
