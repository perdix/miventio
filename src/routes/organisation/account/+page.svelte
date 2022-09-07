<script>
    import Main from "$lib/blocks/Main.svelte";
    import Header from "$lib/blocks/Header.svelte";
    import Content from "$lib/blocks/Content.svelte";

</script>


<Main>
    <Header title="Persönlicher Account"></Header>
    <Content>
        <p>Hier kann der User später sein Passwort ändern!</p>
        <p>Nur der Admin-User sieht die Navigation, ein normaler User kann nur sich selbst verwalten!</p>
    </Content>

</Main>