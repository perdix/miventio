<script>

    import Header from "$lib/organisation/Header.svelte";
    import Navigation from "$lib/organisation/Navigation.svelte";
    import logo from '$lib/assets/logo.jpg';
    import { onMount } from 'svelte';

    // Set custom theme color
    /**
    * @type {HTMLDivElement}
    */
    let templateRoot;
    onMount(async () => {
        templateRoot.style.setProperty('--color-1', '#2E6CB5');
        templateRoot.style.setProperty('--color-1-light', '#d5e1f0');
        templateRoot.style.setProperty('--color-1-dark', '#163566');
        templateRoot.style.setProperty('--color-1-superlight', '#f0f6ff');
        templateRoot.style.setProperty('--color-2', '#163566');
        templateRoot.style.opacity = "1";
    });
    

</script>

<div class="root" bind:this={templateRoot} style="opacity:0;">

 <Header></Header>
 <Navigation {logo} name="Gesellschaft für Parodontologie"></Navigation>

<slot></slot>

</div>
  
