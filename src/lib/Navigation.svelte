<script>
    import { page } from '$app/stores';

	export let organisations = []
	
	export let tabs = [
		{ slug: 'events', title: 'Veranstaltungen', icon: 'event' },
		{ slug: 'contacts', title: 'Kontakte', icon: 'group' },
	];




</script>

<nav>
	<div class="left">
	<a class="settings" href="/organisation/1/settings"><span class="material-symbols-outlined">settings</span></a>
	<div class="organisation">
		<!-- <img src={logo} alt="Logo Organisation" /> -->
		<select name="organisations" id="organisations">
			{#each organisations as organisation}
				<option value={organisation.slug}>{organisation.name}</option>
			{/each}
		</select>
	</div>
</div>

	<ul>
		{#each tabs as tab}
			<li>
				<a
					href="/organisation/1/{tab.slug}"
					class:active={$page.url.pathname.includes(tab.slug)}
					class:marked={tab.slug == 'settings'}
					><span class="material-symbols-outlined">{tab.icon}</span><p>{tab.title}</p>
				
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
		align-items: center;
		padding: calc(var(--unit));
		width: 100%;
	}
	.left {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.left .settings {
		text-decoration: none;
		padding: 10px 20px;
		margin-right: calc( var(--unit) / 2);
		border-radius: var(--corner);
		color: var(--black);
		display: block;
		font-size: 1.5rem;
		background-color: var(--white); 
		background-position: 0%;
		background-size: 200%;
		display: flex;
		align-items: center;

	}

	.left .settings:hover {
		transition: all 0.2s;
		box-shadow: var(--shadow-light);
	}

	.organisation {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		transition: 0.2s;
		background-color: var(--white);
		border-radius: var(--corner);
		padding: 10px;
		cursor: pointer;
	}

	.organisation:hover {
		transition: all 0.2s;
		box-shadow: var(--shadow-light);
	}

	.organisation select,
	.organisation select:focus {
		background-color: var(--white);
		border: none;
		outline: none;
		font-size: 1.3rem;
		font-weight: 400;
		font-family: "Roboto";
		cursor: pointer;
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
		margin-left: calc( var(--unit) / 2);
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

	ul li a span {
		display: inline-block;
		margin-right: 10px;

	}

</style>