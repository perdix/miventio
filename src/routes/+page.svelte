<div class="page">
	<h1>Prototyp Miventio</h1>
	<p>Die meisten Seiten sind klickbar, dennoch: Work in Progress!!</p>
	<div class="wrapper">
		<section>
			<h2>Event Manager</h2>

			<a href="/login">Login-Seite</a>
			<a href="/organisations/1/events">Veranstaltungen</a>
			<a href="/organisations/1/events/1">Event Übersicht</a>
			<a href="/organisations/1/contacts">Kontakte</a>
			<a href="/organisations/1/settings">Einstellungen Organisation</a>
			<a href="/account">Event-Manager-Account</a>
			<a href="/organisations/1/events/1/activities">Aktivitäten/Workshops</a>
			<a href="/organisations/1/events/1/tickets">Tickets</a>
			<a href="/organisations/1/events/1/form">Registrierung</a>
		</section>

		<section>
			<h2>Organisation Manager</h2>
			<a href="/organisation-login">Login</a>
			<a href="/organisation">Organisation (WIP)</a>
			<a href="/organisation/account">User-Account</a>
		</section>
	</div>
</div>

<style>
	.page {
		min-height: 100vh;
		justify-content: center;
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 60px;
	}

	a {
		display: block;
		font-size: 25px;
		margin-top: 20px;
	}
	.wrapper {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}
</style>
