<script lang="ts">
	export let label: string;
	export let value: string;
	export let rangeValue = 3;
	export let placeholder: string;
	export let name: string = placeholder;
	export let showPasswordSwitch = false;
	export let helperText: string = '';
	export let error = '';
	export let required = false;
</script>

<div class="input-wrapper2">
	<div class="range-label">
		<label for={name} class="text-sm">{label}</label>
		<div class="smile">
			<div class="eye" />
			<div class="eye" />
			<div class="mth" />
			<div class="square" style="top:{80 - rangeValue/6 * 24}%;left:0%;" />
			<div class="square" style="top:{80 - rangeValue/6 * 24}%;left:80%;" />
		</div>
	</div>
</div>
<!-- <input
	bind:value={rangeValue}
	type="range"
	{required}
	{name}
	min={0}
	max={1}
	step={0.002}
	class="text-base {error ? 'error' : ''}"
/> -->
<div class="rating">
	<label>
		<input type="radio" bind:group={rangeValue} name="stars" value="1" />
		<span class="icon">★</span>
	</label>
	<label>
		<input type="radio" bind:group={rangeValue} name="stars" value="2" />
		<span class="icon">★</span>
		<span class="icon">★</span>
	</label>
	<label>
		<input type="radio" bind:group={rangeValue} name="stars" value="3" />
		<span class="icon">★</span>
		<span class="icon">★</span>
		<span class="icon">★</span>
	</label>
	<label>
		<input type="radio" bind:group={rangeValue} name="stars" value="4" />
		<span class="icon">★</span>
		<span class="icon">★</span>
		<span class="icon">★</span>
		<span class="icon">★</span>
	</label>
	<label>
		<input type="radio" bind:group={rangeValue} name="stars" value="5" />
		<span class="icon">★</span>
		<span class="icon">★</span>
		<span class="icon">★</span>
		<span class="icon">★</span>
		<span class="icon">★</span>
	</label>
</div>

<style lang="scss">
	.rating {
		display: inline-block;
		position: relative;
		height: 8rem;
		line-height: 8rem;
		font-size: 8rem;
        width:100%;
        font-family:"Fira Code";
	}

	.rating label {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		cursor: pointer;
        display:flex;
        flex-direction:row;
        justify-content:space-between;
	}

	.rating label:last-child {
		position: static;
	}

	.rating label:nth-child(1) {
		z-index: 5;
	}

	.rating label:nth-child(2) {
		z-index: 4;
        width:calc(25% + 4.8rem);
	}

	.rating label:nth-child(3) {
		z-index: 3;
        width:calc(50% + 3.2rem);
	}

	.rating label:nth-child(4) {
		z-index: 2;
        width:calc(75% + 1.6rem);
	}

	.rating label:nth-child(5) {
		z-index: 1;
        width:100%;
	}

	.rating label input {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
	}

	.rating label .icon {
		float: left;
		color: transparent;
        -webkit-text-stroke: 2px lighten($green-primary, 25);
        transition:250ms ease;
        transition-delay:50ms;
	}

	.rating label:last-child .icon {
		color: transparent;
	}
	.rating:not(:hover) label input:checked ~ .icon,
	.rating:hover label:hover input ~ .icon {
		color: lighten($green-primary, 25);

	}
    .rating label input:focus:not(:checked) ~ .icon {
		color: #000;
		text-shadow: 0 0 5px lighten($green-primary, 25);

	}
	.rating label input:focus:not(:checked) ~ .icon:last-child {
		color: #000;
		text-shadow: 0 0 5px lighten($green-primary, 25);

	}
	/* input[type='range'] {
		-webkit-appearance: none;
		height: 0;
		background: rgba($green-primary, 0.6);
		&::-webkit-slider-thumb {
			-webkit-appearance: none;
			height: 20px;
			width: 20px;
			border-radius: 50%;
			background: #ff4500;
			cursor: ew-resize;
			box-shadow: 0 0 2px 0 #555;
			transition: background 0.3s ease-in-out;
		}
		&::-moz-range-thumb {
			-webkit-appearance: none;
			height: 20px;
			width: 20px;
			border-radius: 50%;
			background: #ff4500;
			cursor: ew-resize;
			box-shadow: 0 0 2px 0 #555;
			transition: background 0.3s ease-in-out;
		}
		&::-ms-thumb {
			-webkit-appearance: none;
			height: 20px;
			width: 20px;
			border-radius: 50%;
			background: #ff4500;
			cursor: ew-resize;
			box-shadow: 0 0 2px 0 #555;
			transition: background 0.3s ease-in-out;
		}
	} */
	.eye,
	.square {
		height: 0.7rem;
		width: 0.7rem;
		background: $green-primary;
		position: absolute;
        transition: 140ms ease-in-out;
	}
	.mth {
		height: 0.7rem;
		width: 2.1rem;
		background: $green-primary;
		position: absolute;
		top: 68%;
		left: 20%;
        transition: 140ms ease-in-out;
	}
	.eye {
		top: 0%;
		left: 80%;
		&:first-child {
			left: 0%;
		}
        transition: 140ms ease-in-out;
	}
	.square {
		&:first-child {
			left: 0%;
		}
		&:last-child {
			left: 80%;
		}
        transition: 140ms ease-in-out;
	}
	.range-label {
		display: flex;
		flex-direction: row;
		gap: 3rem;
		align-items: flex-end;
		padding-top: 2rem;
	}
	.smile {
		position: relative;
		height: 3.5rem;
		width: 3.5rem;
	}

/* 	input {
		color: white;
		border: 2px solid $green-primary;
		background: transparent;
		width: 100%;
		&::-moz-placeholder {
			color: $grey;
		}
		&::placeholder {
			color: $grey;
		}
		&:focus-visible {
			border: 2px solid #90d690;
		}
	} */
	/* .icon {
		color: white;
		position: absolute;
		left: 90%;
		margin-top: 0.2rem;
	} */

	/* span {
		width: 100%;
	} */

</style>
