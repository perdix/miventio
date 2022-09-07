<script>

    import {page} from "$app/stores";



    export let logo = "Logo einer Organisation";
    export let name = "Name einer Organisation";

    export let tabs = [
        { slug: 'events', title: 'Veranstaltungen', icon: '' },
        { slug: 'contacts', title: 'Kontakte', icon: '' },
        { slug: 'settings', title: '', icon: 'settings' }
      ]
</script>
  
<nav>
    <div class="organisation">
        <a href="/organisation">
        <img src={logo} alt="Logo von {name}">
        <h1>{name}</h1>
        </a>
    </div>

    <ul>

    {#each tabs as tab}
        <li><a href="/organisation/{tab.slug}" class:active={$page.url.pathname.includes(tab.slug)} class:marked={tab.slug=="settings"} ><span class="material-symbols-outlined">{tab.icon}</span>{tab.title}</a></li>
    {/each}
 
    </ul>

</nav>



<style>

    nav {
        background-color: var(--white);
        display: flex;
        justify-content: space-between;
        align-items: center;
        height:140px;
        padding: 0 var(--unit);
        width: 100%;
    }

    nav a {
        color: black;
        text-decoration: none;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .organisation {
        padding:0.9rem 2rem;
        width: 100%;
        border-radius: 0.3rem;
        transition: 0.2s;
    }
    h1 {
        font-size: 1.5rem;
        font-family: "Baskerville";
        padding:0.5rem 1rem;
    }
   
    img {
        height:40px;
    }

    ul {
        list-style-type: none;
        padding:0;
        display:flex;
        align-self: flex-end;
        justify-content: space-around;
        align-items: flex-end;
        position: relative;
        top:1px;
    }

    ul li a {
        text-decoration: none;
        color:black;
        padding: 10px 20px;
        margin-left: 6px;
        border-radius: 10px 10px 0px 0;
        background-color: var(--color-1-superlight);
        color:var(--color-1-dark);
        display: block;
        font-size: 1.5rem;
    }
    ul li a:hover, ul li a.active {
        background-color: var(--color-1-light);
        color:var(--color-1-dark);
    }



</style>

