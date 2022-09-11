<script>
    import Cart from "$lib/event/Registration/Cart.svelte";
</script>

<section>

    <div class="header">
        <h2>Buchungsdetails</h2>
    </div>

    <div class="row">

        <div class="md-7 padding" >
            
            <div class="row">
                <div class="md-6">
                    <label for="firstname">Vorname</label>
                    <input id="firstname" type="text" placeholder="Vorname">
                </div>
                <div class="md-6">
                    <label for="lastname">Nachname</label>
                    <input id="lastname" type="text" placeholder="Nachname">
                </div>

                <div class="md-8">
                    <label for="email">E-Mail</label>
                    <input id="email" type="email" placeholder="E-Mail">
                </div>

                <div class="md-4">
                    <label for="phone">Telefon</label>
                    <input id="phone" type="text" placeholder="Telefon">
                </div>

                <div class="md-12">
                    <label for="street">Straße</label>
                    <input id="street" type="text" placeholder="Straße">
                </div>

                <div class="md-4">
                    <label for="postcode">Postleitzahl</label>
                    <input id="postcode" type="text" placeholder="Postleitzahl">
                </div>
                <div class="md-8">
                    <label for="city">Stadt</label>
                    <input id="city" type="text" placeholder="Stadt">
                </div>
            </div>
        </div>

        <div class="md-5 bg">
            <Cart></Cart>
        </div>

    </div>

    <div class="footer">
        <button>
            Weiter
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