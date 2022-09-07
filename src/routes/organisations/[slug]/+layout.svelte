<script>
    import Header from "$lib/header.svelte";
    import logo from '$lib/assets/logo.jpg';
    import {page} from "$app/stores";


    export let organisations = [
        { slug: 'zahn', title: 'Gesellschaft für Parodontologie' },
        { slug: 'inner', title: 'Gesellschaft für Gesellschaft für Innere Medizin' },
        { slug: 'herz', title: 'Gesellschaft für Kardiologie' },
    ]

    export let tabs = [
        { slug: 'events', title: 'Veranstaltungen', icon: '' },
        { slug: 'contacts', title: 'Kontakte', icon: '' },
        { slug: 'settings', title: '', icon: 'settings' }
      ]
</script>

<Header />

  <nav>
    <div class="organisation">
        <img src={logo} alt="Logo Organisation">
        
        <select name="organisations" id="organisations">
            {#each organisations as organisation}
                <option value="{organisation.slug}">{organisation.title}</option>
            {/each}
        </select>


    </div>

    <ul>
        {#each tabs as tab}
            <li><a href="/organisations/1/{tab.slug}" class:active={$page.url.pathname.includes(tab.slug)} class:marked={tab.slug=="settings"} ><span class="material-symbols-outlined">{tab.icon}</span>{tab.title}</a></li>
        {/each}
    </ul>

</nav>




<style>

    nav {
        background-color: var(--white);
        display: flex;
        justify-content: space-between;
        align-items: center;
        height:100px;
        padding: 0 calc(var(--unit) * 2);
        width: 100%;
    }

    .organisation {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        border-radius: 0.3rem;
        transition: 0.2s;

    }
    .organisation select, .organisation select:focus {
        background-color: var(--white);
        border:none;
        outline: none;
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
    }




</style>


  
  <slot></slot>