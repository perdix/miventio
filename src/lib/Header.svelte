<script>
	export let organisations = [];
	export let organisation = {};

	import { page } from '$app/stores';

	let isDropdownOpen = false;

	const showOrganisations = () => {
		isDropdownOpen = !isDropdownOpen;
	};
	const changeOrganisation = (org) => {
		isDropdownOpen = !isDropdownOpen;
		// goto(`/organisation/${org.id}`);
		document.location.href = `/organisation/${org.id}`;
	};
</script>

<header>
	<div class="left">
		{#if organisation.role == 'ADMIN'}
		<a href="/organisation/{organisation.id}/settings" class="settings"><span class="material-symbols-outlined">settings</span></a>
		{/if}

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
	<div>
		<a href="/organisation/{organisation.id}/user/{$page.data.session.id}"><span class="material-symbols-outlined">account_circle</span></a>
	</div>
</header>

<style>
		.left {
		display: flex;
		justify-content: flex-start;
		align-items: stretch;
	}
	header {
		background-color: var(--color-1-light);
		background: linear-gradient(-60deg, var(--color-1) 0%, var(--color-1-dark) 100%);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px 15px;
	}
	a {
		color: var(--white);
	}
	.organisation {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-radius: var(--corner);
		cursor: pointer;
		color: var(--white);
		box-shadow: none;
		position: relative;
	}

	.organisation:hover {
		transition: all 0.2s;
		box-shadow: none;
	}

	.organisation h1 {
		font-size: 1.2rem;
	}
	.settings {
		margin-right:10px;
	}
	.arrow {
		margin-left: 8px;
		border-radius: var(--corner);
		display: flex;
		align-items: center;
		cursor: pointer;
		color: var(--white);
		position: relative;
		user-select: none;
	}

	.organisations {
		position: absolute;
		top: 30px;
		right: -27px;
		z-index: 10;
		border-radius: 0 0 var(--corner) var(--corner);
		background-color: var(--lightgrey);
	}
	.organisations h2 {
		padding: 10px 20px;
		font-size: 1.1rem;
		color: var(--color-1-dark);
		font-weight: 300;
	}
	.organisation h2:hover {
		background-color: var(--grey);
	}
	h1 {
		font-family: var(--font-1);
		font-weight: 300;
	}
</style>
