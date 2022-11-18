<script>
	import Main from '$lib/blocks/Main.svelte';
	import Breadcrumbs from '$lib/blocks/Breadcrumbs.svelte';
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
