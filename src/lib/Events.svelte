<script>
	import Time from 'svelte-time';
	import { page } from '$app/stores';
	export let events = [];
</script>

<section>
	{#each events as event}
		<article>
			<a href="/organisation/{$page.params.organisationId}/event/{event.id}">
				<div>
					<h1>{event.name}</h1>
					<p class="date">
						<Time timestamp={event.start} format="DD.MM." /> - <Time
							timestamp={event.end}
							format="DD.MM.YYYY"
						/>
					</p>
					<p class="location">{event.location} in {event.city}</p>
				</div>
				<div class="bottom">
					<p class="count">{event.numberOfVisitors} Teilnehmer</p>

					<p class="visibility">
						<!-- {#if !(event.status == 'OPEN')}
							<span class="material-symbols-outlined">visibility_off</span>
						{/if} -->
					</p>
				</div>
			</a>
		</article>
	{/each}
</section>

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
