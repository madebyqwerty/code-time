<div class="divider-wrapper">
	<div class="divider" />
</div>

<style lang="scss">
	$light-background: lighten($background, 15);
	.divider-wrapper {
		background-color: lighten($background, 15);
		padding-left: 10%;
		padding-right: 10%;
		padding-bottom: 1.6rem;
		padding-top: 1.6rem;
		height: 100%;
		& > .divider {
			height: 1px;

			background-color: lighten($light-background, 10);
		}
	}
</style>
