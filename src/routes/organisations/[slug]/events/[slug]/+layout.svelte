<script>
    import {page} from "$app/stores";
    import Main from "$lib/blocks/Main.svelte";

    export let sections = [
        { slug: 'info', title: 'Basis Info', icon: "info" },
        { slug: 'activities', title: 'Aktivitäten', icon: "event" },
        { slug: 'tickets', title: 'Tickets', icon: 'confirmation_number' },
        { slug: 'form', title: 'Registrierung', icon: "table" },
        { slug: 'bookings', title: 'Buchungen', icon: "badge" }
      ]

</script>
<div class="wrapper">

    <aside>
       <nav><a href="/organisations/1/events/1">
           <div><h2>Zahnarzt-Kongress 2022</h2></div>
           <ul>
            {#each sections as section}
            <li><a href="/organisations/1/events/1/{section.slug}" class:active={$page.url.pathname.includes(section.slug)}>
                <span class="material-symbols-outlined">{section.icon}</span>
                {section.title}
                </a>
            </li>
            {/each}
           </ul>
            </a>
       </nav>
    </aside>
   
    <section>
      
        <Main>
            <slot></slot>
        </Main>   
        
            
    
    </section>
    
</div>



<style>
    .wrapper {
        display: flex;
        justify-content: center;
        align-items: stretch;
    }
    aside {
        width: 30%;
        min-width: 200px;
        background-color: var(--white);
    }
    section {
        width: 70%;
    }
    nav a {
        display: block;
    }
    nav div{
        padding: calc( var(--unit));
        min-height: 200px;
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        align-items: flex-start;
        color:white;
        background: linear-gradient(-30deg, var(--color-1) 0%, var(--color-1-dark) 100%);
    }
    nav ul {
        list-style-type: none;
        padding:0;
    }
    nav ul li a {
        display: block;
        width: 100%;
        padding: var(--unit);
        font-size: 1.7em;
        color: var(--color-1-dark);
    }
    nav a span {
        font-size: 24px;
        margin-right: 5px;
        vertical-align: middle;
        display: inline-block;
    }
    nav ul li:nth-child(odd) a {
        background-color: var(--color-1-light);
    }
    nav ul li a:hover, nav ul li:nth-child(odd) a:hover, nav ul li a.active, nav ul li:nth-child(odd) a.active {
        background-color: var(--color-1);
        color:white;
        transition: 0.1s;
    }


</style>