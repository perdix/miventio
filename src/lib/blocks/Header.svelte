<script>
	export let title = 'Header Title';
</script>

<header>
	<h1>{title}</h1>
	<slot />
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: calc(var(--unit) / 2);
	}

	h1 {
		font-weight: 300;
	}
</style>
