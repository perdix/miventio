<script>
	import Main from '$lib/blocks/Main.svelte';
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';
	import Events from '$lib/Events.svelte';
	import Contacts from '$lib/Contacts.svelte';
	import { page } from '$app/stores';
</script>

<div class="page">
	<Main>
		<Header title={'Mitglieder & Kontakte'}>
			<a class="button secondary" href="{$page.data.organisation.id}/contacts">
				<span class="material-symbols-outlined">group</span>
				<span>Mitgliederverwaltung</span>
			</a>
		</Header>
		<Content>
			<Contacts contacts={$page.data.organisation.contacts.slice(0, 10)} />
		</Content>

		<br /><br />

		<Header title={'Veranstaltungen'}>
			<a class="button secondary" href="{$page.data.organisation.id}/events">
				<span class="material-symbols-outlined">event</span>
				<span>Veranstaltungsmanagement</span>
			</a>
		</Header>

		<Content>
			<Events events={$page.data.organisation.events.slice(0, 4)} />
		</Content>
	</Main>
</div>

<style>
</style>
