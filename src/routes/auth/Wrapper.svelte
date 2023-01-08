<section class="section-default">
	<div>
		<a class="text-base green green-hover width-max" href="/">cd ~/</a>
		<slot />
	</div>
</section>

<style lang="scss">
	.wrapper, .section-default {
		@include center;
	}
	.section-default{
		height:100vh;
		width:100vw;
	}
</style>
