<script>
	export let title = 'Header Title';
	export let icon = '';
</script>

<header>
	<h1>
		{#if icon}
			<span class="material-symbols-outlined">{icon}</span>
		{/if}
		{title}
	</h1>
	<div>
		<slot />
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: calc(var(--unit));
	}

	h1 {
		font-weight: 400;
		font-size: 2.6em;
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--color-1-dark);
		font-family: var(--font-1);
		font-weight: 300;
	}
	h1 span {
		display: block;
		margin-right: 15px;
		font-size: 30px;
	}
</style>
