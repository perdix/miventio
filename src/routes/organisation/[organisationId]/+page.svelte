<script>
	import Main from '$lib/blocks/Main.svelte';
	import Content from '$lib/blocks/Content.svelte';
	import Contacts from '$lib/Contacts.svelte';
	import Events from '$lib/Events.svelte';
	import { page } from '$app/stores';
</script>

<div class="page">
	<Main>
			<div class="block">
				<h2>Überblick</h2>
				<div class="row">
					<div class="md-6 count">
						<section>
							<h3># Veranstaltungen</h3>
							<h4>{$page.data.organisation.events.length}</h4>
						</section>
					</div>
					<div class="md-3 count">
						<section>
							<h3># Mitglieder</h3>
							<h4>{$page.data.organisation.users.length}</h4>
						</section>
					</div>
					<div class="md-3 count">
						<section>
							<h3># Kontakte</h3>
							<h4>{$page.data.organisation.users.length}</h4>
						</section>
					</div>
				</div>
			</div>

			<div class="block">
				<h2>Aktuelle Veranstaltungen</h2>
				<Events events={$page.data.organisation.events.slice(0,2)} />
			</div>

			<div class="block">
				<h2>Neueste Kontakte</h2>
				<Contacts contacts={$page.data.organisation.users} />
			</div>

	</Main>
</div>

<style>
	h2 {
		margin-bottom: 15px;
	}
	.block {
		/* background-color: rgba(255,255,255,1); */
		margin-bottom: 30px;
		min-height: 300px;
	}
	.count {
		padding: 0 15px;
	}
	section {
		background-color: white;
		padding: 50px;
	}

	h3 {
		text-align: center;
		font-size: 20px;
	}
	h4 {
		text-align: center;
		font-size: 60px;
		font-weight: 300;
		color: var(--color-1-dark);
	}
</style>
