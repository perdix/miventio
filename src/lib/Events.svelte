<script>
	import Header from '$lib/blocks/Header.svelte';
	import Main from '$lib/blocks/Main.svelte';

	export let events = [
		{
			title: 'Österreichischer Kongress für Zahnmedizin 2022',
			description: 'Das ist eine Beschreibung des Events',
			date: '21. - 23. März 2022',
			location: 'Palais Epstein',
			visible: true,
			city: 'Wien',
			status: 'Geöffnet',
			bookings: '328'
		},
		{
			title: 'Kongress für Zahnmedizin',
			description: 'Das ist eine Beschreibung des Events',
			date: '21.3.22 - 23.3.22',
			location: 'Palais Epstein',
			city: 'Wien',
			visible: true,
			status: 'Geöffnet',
			bookings: '328'
		},
		{
			title: 'Kongress für Zahnmedizin',
			description: 'Das ist eine Beschreibung des Events',
			date: '21.3.22 - 23.3.22',
			location: 'Palais Epstein',
			city: 'Wien',
			visible: true,
			status: 'Geöffnet',
			bookings: '328'
		},
		{
			title: 'Kongress für Zahnmedizin',
			description: 'Das ist eine Beschreibung des Events',
			date: '21.3.22 - 23.3.22',
			location: 'Palais Epstein',
			city: 'Wien',
			visible: true,
			status: 'Geöffnet',
			bookings: '328'
		},
		{
			title: 'Kongress für Zahnmedizin',
			description: 'Das ist eine Beschreibung des Events',
			date: '21.3.22 - 23.3.22',
			location: 'Palais Epstein',
			city: 'Wien',
			visible: false,
			status: 'Geöffnet',
			bookings: '0'
		},
		{
			title: 'Kongress für Zahnmedizin',
			description: 'Das ist eine Beschreibung des Events',
			date: '21.3.22 - 23.3.22',
			location: 'Palais Epstein',
			city: 'Wien',
			status: 'Geöffnet',
			visible: true,
			bookings: '328'
		},
		{
			title: 'Kongress für Zahnmedizin',
			description: 'Das ist eine Beschreibung des Events',
			date: '21.3.22 - 23.3.22',
			location: 'Palais Epstein',
			city: 'Wien',
			status: 'Geöffnet',
			visible: true,
			bookings: '328'
		}
	];
</script>

<Main>
	<Header title={'Veranstaltungen'} >
		<button>
			Neue Veranstaltung<span class="material-symbols-outlined">add_circle</span>
		</button>
	</Header>

	<section>
		{#each events as event}
			<article>
				<a href="/organisations/1/events/1">
					<div>
						<h1>{event.title}</h1>
						<p class="date">{event.date}</p>
						<p class="location">{event.location} in {event.city}</p>
						
					</div>
					<div class="bottom">
						<p class="count"> {event.bookings} Anmeldungen</p>
						<p class="visibility">
							{#if !event.visible}
								<span class="material-symbols-outlined">visibility_off</span>
							{/if}
						</p>
						
					</div>
				</a>
			</article>
		{/each}
	</section>
</Main>

<style>
	section {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: var(--unit);
	}
	article a {
		background: white;
		height: 300px;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		flex-direction: column;
		padding: var(--unit);
		color: black;
		/* box-shadow: var(--shadow-light); */
	}
	article a:hover {
		box-shadow: var(--shadow-light);
	}
	article h1 {
		font-size: 1.5rem;
	}
	article h2 {
		font-size: 1.2rem;
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
	.status {
		background-color: var(--color-1);
		padding: 5px 10px;
		border-radius: 30px;
		color: white;
		display: inline-block;
		margin-top: 10px;
	}
	.count {
		background-color: var(--lightgrey);
		padding: 5px 10px;
		border-radius: 30px;
		color: var(--darkgrey);
	}
	.bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}
	.visibility {
		color: var(--darkgrey);
	}
</style>
