<article class="ticket">
    <div class="left">
        <span class="cut"></span>
        <p>50€</p>
    </div>
    <div class="right">
        <div class="holes">
            <div class="hole"></div>
            <div class="hole"></div>
            <div class="hole"></div>
            <div class="hole"></div>
            <div class="hole"></div>
            <div class="hole"></div>
            <div class="hole"></div>
            <div class="hole"></div>
        </div>
        <span class="cut"></span>
        <h3>Komplettpaket</h3>
        <p>Student</p>
    </div>
</article>

<style>
.ticket {
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    background-color: white;
    height: 80px;
    /* box-shadow: var(--shadow-light); */
    transition: all 0.5s;
    overflow: hidden;
    margin: 10px;
}
.ticket:hover {
    box-shadow: var(--shadow);
    cursor: pointer;
    transition: all 0.5s;
}
.ticket:hover .left {
    background-position: 100%;
    transition: all 0.5s;
}
.left {
    transition: all 0.5s;
    width: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-1);
    position: relative;
    background: linear-gradient(132deg, rgba(159,163,194,1) 0%, rgba(56,83,128,1) 100%);
    background-position: 0%;
    background-size: 200%;
}

.left p{
    font-size: 20px;
    margin-left:10px;
    color: white;
}
.left .cut {
    font-size: 35px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 40px;
    width: 40px;
    background-color: var(--color-1-light);
    border-radius: 0% 50px 50px 0%;
    left:-30px;
}
.right .cut {
    font-size: 35px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 40px;
    width: 40px;
    background-color: var(--color-1-light);
    border-radius: 50px 0px 00px 50px;
    right:-30px;
}
.right {
    position: relative;
    width: 100%;
    padding: var(--unit);
}

.holes {
    position: absolute;
    top:-8px;
    left: -10px
}

.hole {
    background-color: var(--color-1-light);
    width: 12px;
    height: 12px;
    border-radius: 6px;
    margin:5px;
}

</style>