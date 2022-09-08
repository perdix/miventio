<article class="ticket">
    <div class="left">
        <span class="cut"></span>
        <p>50€</p>
    </div>
    <div class="right">
        <span class="cut"></span>
        <h3>Komplettpaket</h3>
        <p>Student</p>
    </div>
</article>

<style>
.ticket {
    margin: var(--unit);
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    background-color: white;
    height: 120px;
    box-shadow: var(--shadow-light);
}
.ticket:hover {
    box-shadow: var(--shadow);
    cursor: pointer;
}
.ticket:hover .left {
    background-position: 100%;
}
.left {
    width: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-1);
    position: relative;
    background: linear-gradient(132deg, var(--color-1) 0%, var(--color-2) 100%);
    background-position: 0%;
    background-size: 200%;
}

.left p{
    font-size: 28px;
    margin-left:10px;
    color: white;
}
.left .cut {
    font-size: 35px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 50px;
    width: 50px;
    background-color: var(--color-1-light);
    border-radius: 0% 50px 50px 0%;
    left:-30px;
}
.right .cut {
    font-size: 35px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 50px;
    width: 50px;
    background-color: var(--color-1-light);
    border-radius: 50px 0px 00px 50px;
    right:-30px;
}
.right {
    position: relative;
    width: 100%;
    padding: var(--unit);
}

</style>