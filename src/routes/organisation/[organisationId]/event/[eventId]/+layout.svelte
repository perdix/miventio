<script>
	import { page } from '$app/stores';
	import Main from '$lib/blocks/Main.svelte';
	import Time from 'svelte-time';
	import { event } from '$lib/store/event';
	$event = { ...$page.data.event };
	import Subnavigation from '$lib/Subnavigation.svelte';
	import Breadcrumbs from '$lib/blocks/Breadcrumbs.svelte';



	export let sections = [
		{ slug: 'info', title: 'Allgemeine Daten', icon: 'info' },
		{ slug: 'categories', title: 'Teilnahmekategorien', icon: 'category' },
		{ slug: 'tickets', title: 'Ticketvarianten', icon: 'confirmation_number' },
		{ slug: 'activities', title: 'Programm', icon: 'calendar_view_week' },
		// { slug: 'form', title: 'Formular', icon: 'table' },
		// { slug: 'hotels', title: 'Hotels', icon: 'hotel' },
		{ slug: 'bookings', title: 'Buchungen', icon: 'payments' },
		{ slug: 'visitors', title: 'Besucher', icon: 'badge' }
	];

	const subNavItems = [
        {
            name: 'Veranstaltungen',
            slug: 'events',
			status: 'active'
        },
        // {
        //     name: 'Aussteller',
        //     slug: "exhibitors"
        // },
        // 
        //     name: 'Hotels',
        //     slug: "hotels",
        // },
        {
            name: 'Lieferanten',
            slug: "contractors"
        },
        // {
        //     name: 'Referenten',
        //     slug: "speakers",
        // },
    ]

	let links = [
		{
            name: 'Veranstaltungen',
            url: `/organisation/${$page.params.organisationId}/events`
        },
		{
            name: $event.name,
            url: `/organisation/${$page.params.organisationId}/event/${$page.params.eventId}`
        }
	];
</script>

<!-- <Subnavigation items={subNavItems}></Subnavigation>	 -->
<Breadcrumbs links={links}></Breadcrumbs>

<div class="wrapper">
	<aside>
		<nav>
			<a href="/organisation/{$page.params.organisationId}/event/{$page.params.eventId}">
				<div>
					<h1>{$event.name}</h1>
					<p class="date">
						<Time timestamp={$event.start} format="DD.MM." /> - <Time
							timestamp={$event.end}
							format="DD.MM.YYYY"
						/>
					</p>
					<p class="location">{$event.location} in {$event.city}</p>
				</div>
				<ul>
					{#each sections as section}
						<li>
							<a
								href="/organisation/{$page.params.organisationId}/event/{$page.params.eventId}/{section.slug}"
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
		min-width: 300px;
	}
	section {
		width: 76%;
	}
	nav a {
		display: block;
	}
	nav div {
		padding: calc(var(--unit) * 1);
		background-color: var(--white);
		min-height: 200px;
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
		padding: 20px;
		padding-left: 20px;
		font-size: 1.5em;
		font-weight: 300;
		color: var(--black);
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
