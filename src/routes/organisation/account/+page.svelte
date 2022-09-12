<script>
    import Main from "$lib/blocks/Main.svelte";
    import Header from "$lib/blocks/Header.svelte";
    import Content from "$lib/blocks/Content.svelte";

</script>


<Main>
    <Header title="Persönlicher Account"></Header>
    <Content>
        <h2>Meine Daten</h2>
        <form action="" class="miventio row">
             <div class="md-12">
                 <label for="email">E-Mail</label>
                 <input id="email" type="email" disabled>
             </div>
             <div class="md-6">
                 <label for="password">Passwort</label>
                 <input id="password" type="password">
             </div>
             <div class="md-6">
                 <label for="password-repeat">Passwort Wiederholung</label>
                 <input id="password-repea" type="password">
             </div>
             <div class="md-12 submit">
                 <button type="submit">Speichern</button>
             </div>
        </form>
     </Content>

</Main>


<style>

    h2 {
        font-weight: 300;
        font-size: 25px;
        margin-bottom: 30px;
    }



</style>