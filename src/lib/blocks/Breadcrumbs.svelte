<script>
	export let links = [];
</script>

<nav>
	<ul>
		{#each links as link}
			<li>
				<a href={link.url}>{link.name}</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		padding: 5px calc(var(--unit) / 2);
		width: 100%;
		background-color: var(--white);
		border-bottom: 1px solid var(--lightgrey);
	}
	ul {
		padding: 0;
		margin: 0;
		list-style-type: none;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	ul li a {
		color: var(--black);
	}
	ul li a:hover {
		color: var(--color-1-dark);
	}
	ul li:not(:last-child)::after {
		content: '/';
		display: inline-block;
		margin: 0 10px;
	}
	ul li:last-child a {
		color: var(--color-1-dark);
	}
</style>
