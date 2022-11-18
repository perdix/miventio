<div class="spin" />

<style>
	@keyframes spinner {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	.spin {
		animation: 1.5s linear infinite spinner;
		animation-play-state: inherit;
		border: solid 5px #cfd0d1;
		border-bottom-color: var(--darkgrey);
		border-radius: 50%;
		height: 25px;
		top: 0%;
		left: 0%;
		width: 25px;
		will-change: transform;
	}
</style>
