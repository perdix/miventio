<script>

    import Header from "$lib/Organisation/Header.svelte";
    import Navigation from "$lib/Organisation/Navigation.svelte";
    import logo from '$lib/assets/logo.jpg';
    import { color, backgroundColor } from '../../stores.js';
    import { onMount } from 'svelte';

    // Set custom theme color
    /**
    * @type {HTMLDivElement}
    */
    let templateRoot;
    onMount(async () => {
        templateRoot.style.setProperty('--color-1', '#2E6CB5');
        templateRoot.style.setProperty('--color-1-light', '#d5e1f0');
    });
    


</script>

<div class="root" bind:this={templateRoot}>

 <Header></Header>
 <Navigation {logo} name="Gesellschaft für Parodontologie"></Navigation>

<slot></slot>

</div>
  
