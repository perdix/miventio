<script>
	import Contacts from '$lib/Contacts.svelte';
	import { page } from '$app/stores';
	import Header from '$lib/blocks/Header.svelte';
	import Main from '$lib/blocks/Main.svelte';
</script>

<div class="page">
	
	
	<Main>
		<Header title={'Kontakte'}>
			<button>
				Neuer Kontakt<span class="material-symbols-outlined">add_circle</span>
			</button>
		</Header>
	
	<Contacts contacts={$page.data.contacts} />



	</Main>
</div>
