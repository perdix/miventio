<main>
	<!-- <hr> -->
	<div>
		<slot />
	</div>
</main>

<style>
	main {
		padding: calc(var(--unit) * 1);
		padding-top: 0;
		background-color: var(--lightgrey);
		height: 100%;
		/* position: relative; */
		/* border-top: 1px solid white; */
	}
	/* hr {
		margin: 0 30px;
		background-color: white;
		color:white;
		border:none;
		height: 2px;
	} */
	div {
		padding: calc(var(--unit) * 1);
		/* background-color: white; */
		min-height: 500px;
		border-radius: var(--corner);
	}
</style>
