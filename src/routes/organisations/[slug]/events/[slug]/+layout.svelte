<script>
	import { page } from '$app/stores';
	import Main from '$lib/blocks/Main.svelte';

	export let event = {
			title: 'Österreichischer Kongress für Zahnmedizin 2022',
			description: 'Das ist eine Beschreibung des Events',
			date: '21. - 23. März 2022',
			location: 'Palais Epstein',
			visible: true,
			city: 'Wien',
			status: 'Geöffnet',
			bookings: '328'
		}

	export let sections = [
		{ slug: 'info', title: 'Allgmeine Infos', icon: 'info' },
		{ slug: 'activities', title: 'Aktivitäten', icon: 'calendar_view_week' },
		{ slug: 'tickets', title: 'Tickets', icon: 'confirmation_number' },
		{ slug: 'form', title: 'Formular', icon: 'table' },
		{ slug: 'bookings', title: 'Anmeldungen', icon: 'badge' }
	];
</script>

<div class="wrapper">
	<aside>
		<nav>
			<a href="/organisations/1/events/1">
				<div>
					<h1>{event.title}</h1>
					<p class="date">{event.date}</p>
					<p class="location">{event.location} in {event.city}</p>
				</div>
				<ul>
					{#each sections as section}
						<li>
							<a
								href="/organisations/1/events/1/{section.slug}"
								class:active={$page.url.pathname.includes(section.slug)}
							>
								<span class="material-symbols-outlined">{section.icon}</span>
								{section.title}
							</a>
						</li>
					{/each}
				</ul>
			</a>
		</nav>
	</aside>

	<section>
		<Main>
			<slot />
		</Main>
	</section>
</div>

<style>
	.wrapper {
		display: flex;
		justify-content: center;
		align-items: stretch;
	}
	aside {
		width: 24%;	
		min-width: 400px;
	}
	section {
		width: 76%;
	}
	nav a {
		display: block;
	}
	nav div {
		padding: calc(var(--unit) * 2);
		background-color: var(--white);
		min-height: 300px;
		display: flex;
		justify-content: flex-end;
		flex-direction: column;
		align-items: flex-start;
		/* background: linear-gradient(-30deg, var(--color-1) 0%, var(--color-1-dark) 100%); */
	}
	nav div h1 {
		color: black;
		font-size: 2rem;
		font-weight: 200;
	}

	.date {
		margin-top: 15px;
		font-weight: 500;
		font-size: 1.2rem;
		color: var(--color-1-dark);
	}
	.location {
		margin-top: 2px;
		font-size: 1.1rem;
		font-weight: 300;
		color: var(--darkgrey);
	}
	nav ul {
		list-style-type: none;
		padding-left: 0px;
		background-color: var(--lightgrey);
	}
	nav ul li a {
		display: block;
		width: 100%;
		padding: var(--unit);
		padding-left: 50px;
		font-size: 1.7em;
		color: var(--darkgrey);
		border-left: 10px solid transparent;
	}
	nav a span {
		font-size: 24px;
		margin-right: 5px;
		vertical-align: middle;
		display: inline-block;
	}
	nav ul li a:hover,
	nav ul li:nth-child(odd) a:hover,
	nav ul li a.active,
	nav ul li:nth-child(odd) a.active {
		background-color: var(--grey);
		color: var(--color-1-dark);
		transition: 0.1s;
		/* border-right: 5px solid var(--color-1); */
		border-left: 10px solid var(--color-1);
	}
</style>
