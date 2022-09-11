<script>
    import Cart from "$lib/event/Registration/Cart.svelte";
</script>

<section>

    <div class="header">
        <h2>Zahlungsvorgang</h2>
    </div>

    <div class="row">
        <div class="md-7">
            <h3>zB. Stripe</h3>
        </div>
        <div class="md-5 bg">
            <Cart></Cart>
        </div>
    </div>

    <div class="footer">
        <button>
            Bestellen
        </button>
    </div>


</section>


<style>
section {
        background-color: white;
        border-radius: 5px;
        padding: 30px;
        margin-bottom: 20px;
    }
    section h3 {
        margin-top:30px;
        margin-bottom: 15px;
    }
    .header h2 {
        font-size:24px;
        font-weight: 300;
    }
    .footer {
       display: flex;   
       width: 100%  ;
       justify-content: flex-end;
       align-items: center;
       padding-top: 30px;
    }

    .bg {
        background: linear-gradient(132deg, rgba(181,209,224,0.11528361344537819) 0%, rgba(41,72,124,0.08167016806722693) 100%);
        padding: 10px;
        border-radius: 5px;
    }
</style>