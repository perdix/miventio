<script>
    import Ticket from "$lib/Ticket.svelte";
    import Cart from "$lib/event/Registration/Cart.svelte";

    const steps = [
        { "id":1, "name": "Ticketauswahl"},
        { "id":2, "name": "Buchungsdetails"},
        { "id":3, "name": "Zahlungsvorgang"}
    ]

</script>

<div class="registration">


    
    <form class="register">

    <div class="stepper">
        <hr>
        {#each steps as step, i}
            <div class="step" class:first="{i==0}" class:last="{i==steps.length-1}">
                <span class="id">{step.id}</span><p class="label">{step.name}</p>
            </div>
        {/each}
    </div>

    <div class="sections">
       
        <section class="row">
        <div class="selection md-12"> 
        
            <div>
                <h3>Persönliche Details</h3>
            </div>
            <div class="row">
                <div class="md-2">
                    <label for="title">Titel</label>
                    <input id="title" type="text" placeholder="Titel">
                </div>
                <div class="md-5">
                    <label for="firstname">Vorname</label>
                    <input id="firstname" type="text" placeholder="Vorname">
                </div>
                <div class="md-5">
                    <label for="lastname">Nachname</label>
                    <input id="lastname" type="text" placeholder="Nachname">
                </div>
     
                <div class="md-6">
                    <label for="email">E-Mail</label>
                    <input id="email" type="email" placeholder="E-Mail">
                </div>

                <div class="md-6">
                    <label for="status">Teilnahme-Status</label>
                    <select name="" id="status">
                        <option value="student">Student</option>
                        <option value="member">Mitglied</option>
                        <option value="general">Allgemein</option>
                    </select>
                </div>

                
            </div>
            <div>
                <h3>Wählen Sie Ihr Ticket</h3>
            </div>

            <div class="tickets">
                <div class="scroll-box">
                    <Ticket></Ticket>
                    <Ticket></Ticket>
                    <Ticket></Ticket>
                    <Ticket></Ticket>
                </div>
            </div>

            <div>
                <h3>Event-Details</h3>
            </div>
            <div class="activities">

                <h4>Workshops</h4>

                <fieldset class="row">  

                    <div class="md-12">
                        <input type="checkbox" id="scales" name="scales" >
                        <label for="scales">WS 04: Assistenz bei Zahnaufhellung | Tanja Bogenreiter (Do, 06.10., 09:15 - 12:30 Uhr)</label>
                    </div>

                    <div class="md-12">
                        <input type="checkbox" id="scales" name="scales" >
                        <label for="scales">WS 04: Assistenz bei Zahnaufhellung | Tanja Bogenreiter (Do, 06.10., 09:15 - 12:30 Uhr)</label>
                    </div>

                    <div class="md-12">
                        <input type="checkbox" id="scales" name="scales" checked>
                        <label for="scales">WS 04: Assistenz bei Zahnaufhellung | Tanja Bogenreiter (Do, 06.10., 09:15 - 12:30 Uhr)</label>
                    </div>

                    <div class="md-12">
                        <input type="checkbox" id="scales" name="scales" >
                        <label for="scales">WS 04: Assistenz bei Zahnaufhellung | Tanja Bogenreiter (Do, 06.10., 09:15 - 12:30 Uhr)ales</label>
                    </div>

                </fieldset>


                <h4>Zusätzliche Events</h4>

                <fieldset class="row">  

                    <div class="md-12">
                        <input type="checkbox" id="scales" name="scales" >
                        <label for="scales">CHARITY KONGRESS-CLUBBING (Freiblick) Freitag, 07.10.2022 | 19.30 Uhr | € 30,- p.P.</label>
                    </div>

                    <div class="md-12">
                        <input type="checkbox" id="scales" name="scales" checked>
                        <label for="scales">CHARITY KONGRESS-CLUBBING (Freiblick) Freitag, 07.10.2022 | 19.30 Uhr | € 30,- p.P.</label>
                    </div>

                    <div class="md-12">
                        <input type="checkbox" id="scales" name="scales" >
                        <label for="scales">CHARITY KONGRESS-CLUBBING (Freiblick) Freitag, 07.10.2022 | 19.30 Uhr | € 30,- p.P.</label>
                    </div>

                </fieldset>

            </div>
            <div class="footer">
                <button>
                    Zusätzliche Person
                </button>
                <button>
                    Weiter
                </button>
            </div>
        </div>
    
        
        </section>

        <section>
            <div>
            <h3>Buchungsdetails</h3>
            <p>Adresse etc.</p>
            </div>

            <Cart></Cart>

        </section>

        <section>
            <div>
                <h3>Übersicht, Zahlungsvorgang</h3>
            </div>

            <Cart></Cart>

        </section>
    

    </div>

</form>








</div>



<style>
    .registration {
        background-color: transparent;
    }
    
    .stepper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        position: relative;
        z-index: 100;
        background-color: white;
        border-radius: 5px;
        padding: 10px;
        overflow: hidden;
    }
    .stepper .step {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
    }
    .stepper .first {
        justify-content: flex-start;
    }
    .stepper .last {
        justify-content: flex-end;
    }

    .stepper .id {
        background-color: #2062a8;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .stepper .label {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 10px;
        background-color: white;
    }
    .stepper hr{
       position: absolute;
       width: 90%;
       z-index: -1;
    }

    .sections {
        
    }

    section {
        background-color: white;
        min-height: 400px;
        border-radius: 5px;
        padding: 30px;
        display: flex;
        justify-content: space-between;
        align-items: stretch;
    }
    section h3 {
        margin-top:30px;
    }
    section h4 {
        margin-top: 20px;
    }

    .selection {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }

    .footer {
       display: flex;   
       width: 100%  ;
       justify-content: flex-end;
       align-items: center;
    }

    .tickets {
        width: 100%;
        padding:15px;
        overflow-x: scroll;
        /* background-color: var(--color-1-light); */
    }
    .tickets .scroll-box {
        display: flex;
        align-items: center;
        white-space: nowrap;
    }




</style>