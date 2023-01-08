<section class="section-default">
	<span>
		<a class="text-base green green-hover" href="/">cd ~/</a>
		<div class="wrapper">
			<slot />
		</div>
	</span>
</section>

<style lang="scss">
	.section-default {
		@include center;
		width: 100vw;
		height: 100vh;
	}

	.wrapper {
		@include center;
		padding: 3.2rem 1.6rem;
		border: 2px solid #46bc46;
		gap: 1.6rem;
		text-align: left;
		align-items: start;
	}
</style>
