<script>
	import { page } from '$app/stores';

	export let organisation = {};

	export let tabs = [
		{ slug: 'events', title: 'Veranstaltungsmanagement', icon: 'event' },
		// { slug: 'contractors', title: 'Lieferantenmanagement', icon: 'handshake' },
		{ slug: 'contacts', title: 'Mitgliederverwaltung', icon: 'group' }
	];
</script>

<nav>
	<div class="left" />

	<ul>
		{#each tabs as tab}
			<li>
				<a
					href="/organisation/{organisation.id}/{tab.slug}"
					class:active={$page.url.pathname.includes(tab.slug)}
					class:marked={tab.slug == 'settings'}
					><span class="material-symbols-outlined">{tab.icon}</span>
					{#if tab.title}
						<p>{tab.title}</p>
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		background-color: var(--grey);
		display: flex;
		justify-content: space-between;
		align-items: stretch;
		padding: calc(var(--unit) / 2) calc(var(--unit) / 2);
		width: 100%;
	}

	ul {
		list-style-type: none;
		padding: 0;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		position: relative;
		top: 1px;
		width: 100%;
	}

	ul li a {
		text-decoration: none;
		padding: 8px 10px;
		/* margin-left: calc(var(--unit) / 2); */
		border-radius: var(--corner);
		color: var(--black);
		display: block;
		font-size: 1.5em;
		background-color: var(--white);
		display: flex;
		align-items: center;
		font-weight: 400;
		margin-right: 10px;
	}
	ul li a:hover,
	ul li a.active {
		transition: all 0.2s;
		box-shadow: var(--shadow-light);
		/* background-color: var(--color-1-dark); */
		background: linear-gradient(-60deg, var(--color-2-dark) 0%, var(--color-2) 100%);

		color: var(--white);
	}

	ul li a p {
		margin-left: 10px;
	}
</style>
