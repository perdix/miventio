<script>
	export let color = 'transparent';
</script>

<section style="background-color:{color}">
	<slot />
</section>

<style>
	section {
		/* background-color: var(--white); */
		margin-bottom: var(--unit);
		min-height: 200px;
	}
</style>
