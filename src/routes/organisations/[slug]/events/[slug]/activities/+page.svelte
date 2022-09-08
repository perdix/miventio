<script>
    import Header from "$lib/blocks/Header.svelte";
    import Content from "$lib/blocks/Content.svelte";


    export let activities = [
    { title: 'Workshop 1', desc: "Ein ganz besonderer Workshop", start: "15:00", end: "16:00", price: "40€", limit: 40 },
    { title: 'Workshop 1', desc: "Ein ganz besonderer Workshop", start: "15:00", end: "16:00", price: "40€", limit: 40 },
    { title: 'Workshop 1', desc: "Ein ganz besonderer Workshop", start: "15:00", end: "16:00", price: "40€", limit: 40 },
    { title: 'Workshop 1', desc: "Ein ganz besonderer Workshop", start: "15:00", end: "16:00", price: "40€", limit: 40 }
]
</script>


    <Header title={"Aktivitäten"}>
        <button>Neu <span class="material-symbols-outlined">add_circle</span></button>
    </Header>  

    <Content>
        <p>Hier kann man Workshops etc. erstellen und verwalten</p>
        <p>Vielleicht kann man später auch eine Kalenderansicht programmieren.</p>
    </Content>    

    <Content>
        <h3>Tag 1: 21.3.2023</h3>
        <table>
            <tr>
              <th>Title</th>
              <th>Beschreibung</th>
              <th>Start</th>
              <th>Ende</th>
              <th>Preis</th>
              <th>Besucher-Limit</th>
            </tr>
        
            {#each activities as activity}
                <tr>
                    <td>{activity.title}</td>
                    <td>{activity.desc}</td>
                    <td>{activity.start}</td>
                    <td>{activity.end}</td>
                    <td>{activity.price}</td>
                    <td>{activity.limit}</td>
                </tr>
            {/each}

            
        </table>

    </Content>   

    <Content>
        <h3>Tag 2: 22.3.2023</h3>
        <table>
            <tr>
              <th>Title</th>
              <th>Beschreibung</th>
              <th>Start</th>
              <th>Ende</th>
              <th>Preis</th>
              <th>Besucher-Limit</th>
            </tr>
        
            {#each activities as activity}
                <tr>
                    <td>{activity.title}</td>
                    <td>{activity.desc}</td>
                    <td>{activity.start}</td>
                    <td>{activity.end}</td>
                    <td>{activity.price}</td>
                    <td>{activity.limit}</td>
                </tr>
            {/each}
    </Content>   

<style>
    h3 {
        margin-bottom: var(--unit);
    }
</style>