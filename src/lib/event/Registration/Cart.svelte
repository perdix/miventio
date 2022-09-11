<script>
    let cart = {}
    cart.tickets = [{"firstname": "Paul", "lastname": "Opitz", "total": 490 }, {"firstname": "Max", "lastname": "Mustermann", "total": 300 }]
    cart.address = { "firstname": "Paul Opitz"}

    $: sum = cart.tickets.map(i => i.total).reduce((a, b) => a + b, 0);
</script>


<div class="cart">

    {#each cart.tickets as ticket}

        <div class="person">
            <div class="left">
                <h3>Gesamte Tagung</h3>
                <p>Teilnehmer: {ticket.firstname} {ticket.lastname}</p>
                <p>Workshop 1, Workshop 3</p>
            </div>
            <div class="right">
                <h3>{ticket.total}€</h3>
            </div>
        </div>

    {/each}
    
    <div class="sum">
        <div class="left">
            <h3>Gesamt</h3>
        </div>
        <div class="right">
            <h3>{sum}€</h3>
        </div>
    </div>
    
   

</div>

<style>

.cart {
}


.person {
    padding: 15px;
}

.person {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
}
.sum {
    padding: 15px;
    border-top: 1px solid black;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
}

</style>
