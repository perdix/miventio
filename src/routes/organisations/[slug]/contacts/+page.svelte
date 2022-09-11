<script>
    import Contacts from "$lib/Contacts.svelte";
    import {page} from "$app/stores";
</script>

<div class="page">

 <Contacts contacts={$page.data.contacts}/>

</div>

