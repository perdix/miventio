<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let organisations = [];
	export let organisation = {};

	export let tabs = [
		{ slug: 'events', title: 'Veranstaltungen', icon: 'event' },
		{ slug: 'contacts', title: 'Kontakte', icon: 'group' }
	];

	// Show settings only for admin
	if (organisation.role == 'ADMIN') {
		tabs.push({ slug: 'settings', title: '', icon: 'settings' });
	}

	let isDropdownOpen = false;

	const showOrganisations = () => {
		isDropdownOpen = !isDropdownOpen;
	};
	const changeOrganisation = (org) => {
		isDropdownOpen = !isDropdownOpen;
		goto(`/organisation/${org.id}`);
	};
</script>

<nav>
	<div class="left">
		<!-- <img src={logo} alt="Logo Organisation" /> -->
		<a href="/organisation/{organisation.id}" class="organisation">
			<h1>{organisation.name}</h1>

			<div class="organisations" style:visibility={isDropdownOpen ? 'visible' : 'hidden'}>
				{#each organisations as org}
					<h2 on:click|preventDefault={() => changeOrganisation(org)}>{org.name}</h2>
				{/each}
			</div>
		</a>
		{#if organisations.length > 1}
			<div class="arrow" on:click={showOrganisations}>
				<span class="material-symbols-outlined"> keyboard_arrow_down </span>
			</div>
		{/if}
	</div>

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
		padding: calc(var(--unit)) calc(var(--unit) * 2);
		width: 100%;
	}
	.left {
		display: flex;
		justify-content: flex-start;
		align-items: stretch;
	}

	.organisation {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		transition: 0.2s;
		background-color: var(--white);
		border-radius: var(--corner);
		padding: 10px 20px;
		cursor: pointer;
		color: var(--color-1-dark);
		box-shadow: none;
		position: relative;
	}

	.organisation:hover {
		transition: all 0.2s;
		box-shadow: none;
	}

	.organisation h1 {
		font-size: 2rem;
	}
	.arrow {
		background-color: white;
		margin-left: -7px;
		padding: 10px;
		border-radius: var(--corner);
		display: flex;
		align-items: center;
		cursor: pointer;
		color: var(--color-1-dark);
		position: relative;
		user-select: none;
	}

	.organisations {
		position: absolute;
		top: 63px;
		right: -36px;
		z-index: 10;
		border-radius: 0 0 var(--corner) var(--corner);
		background-color: var(--lightgrey);
	}
	.organisations h2 {
		padding: 10px 20px;
		font-size: 1.4rem;
		color: var(--color-1-dark);
		font-weight: 400;
	}
	.organisation h2:hover {
		background-color: var(--grey);
	}

	ul {
		list-style-type: none;
		padding: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: relative;
		top: 1px;
	}

	ul li a {
		text-decoration: none;
		padding: 10px 20px;
		margin-left: calc(var(--unit) / 2);
		border-radius: var(--corner);
		color: var(--black);
		display: block;
		font-size: 1.5em;
		background-color: var(--white);
		display: flex;
		align-items: center;
		font-weight: 400;
	}
	ul li a:hover,
	ul li a.active {
		transition: all 0.2s;
		box-shadow: var(--shadow-light);
	}

	ul li a p {
		margin-left: 10px;
	}
</style>
