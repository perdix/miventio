<script>
	import Time from 'svelte-time';

	export let ticket = {};
	export let event = {};
	export let form = false;
</script>

<article class="ticket" class:form>
	<div class="left">
		<span class="cut" />
	</div>
	<div class="middle">
		<div class="holes">
			<div class="hole" />
			<div class="hole" />
			<div class="hole" />
			<div class="hole" />
			<div class="hole" />
			<div class="hole" />
			<div class="hole" />
			<div class="hole" />
			<div class="hole" />
			<div class="hole" />
			<div class="hole" />
			<div class="hole" />
		</div>
	</div>
	<div class="right-box">
		<span class="cut" />
		<div class="main">
			<div>
				<div>
					<h1>{ticket.name}</h1>
				</div>

				{#if ticket.date}
					<p>Gültig am: <Time timestamp={ticket.date} format="DD.MM.YYYY" /></p>
				{:else}
					<p />
				{/if}
				<div>
					{#if ticket.category}
						<p class="cat">{ticket.category}</p>
					{/if}
					<p class="price">{ticket.price} €</p>
				</div>
			</div>

			<!-- <h2>{event.name}</h2> -->
		</div>
		<div class="desc" />
	</div>
</article>

<style>
	.ticket {
		flex-shrink: 0;
		/* width:300px; */
		display: flex;
		justify-content: space-between;
		align-items: stretch;
		background-color: white;
		/* height: 100px; */
		transition: all 0.5s;
		overflow: hidden;
		margin: 10px;
	}
	.ticket:hover {
		/* box-shadow: var(--shadow-light); */
		cursor: pointer;
		transition: all 0.5s;
	}
	.ticket:hover .left {
		background-position: 100%;
		transition: all 0.5s;
	}
	.left {
		transition: all 0.5s;
		width: 70px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--color-1);
		position: relative;
		background: linear-gradient(-60deg, var(--color-1) 0%, var(--color-1-dark) 100%);
		background-position: 0%;
		background-size: 200%;
		background-color: var(--color-1-light);
	}
	.form .left {
		background: #b9b9b9;
		/* background: #262626; */
	}

	.left .cut {
		font-size: 35px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		height: 70px;
		width: 70px;
		background-color: var(--lightgrey);
		border-radius: 0% 50px 50px 0%;
		left: -56px;
	}
	.form .left .cut,
	.form .right-box .cut,
	.form .hole {
		background-color: white;
	}
	.form .right-box,
	.form .middle {
		background-color: #f8f8f8;
	}

	.middle {
		position: relative;
		width: 10px;
	}
	.holes {
		position: absolute;
		top: -8px;
		left: -10px;
	}
	.hole {
		background-color: var(--lightgrey);
		width: 10px;
		height: 10px;
		border-radius: 6px;
		margin: 5px;
	}
	.right-box .cut {
		font-size: 35px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		height: 70px;
		width: 70px;
		background-color: var(--lightgrey);
		border-radius: 50px 0px 00px 50px;
		right: -55px;
	}
	.right-box {
		position: relative;
		width: 100%;
		padding: 15px;
		padding-right: 30px;
		display: flex;
		justify-content: space-between;
		align-items: stretch;
	}
	.main {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: flex-start;
	}
	.main h1 {
		font-size: 1.3rem;
		font-weight: 400;
		display: inline-block;
	}
	.cat {
		background-color: var(--color-1-light);
		color: white;
		display: inline-block;
		padding: 2px 8px;
		margin-top: 5px;
		font-size: 1.2rem;
		font-weight: 300;
		border-radius: var(--corner);
		/* display: inline-block; */
	}
	.price {
		font-size: 1.2rem;
		font-weight: 400;
		color: var(--white);
		margin-top: 5px;
		padding: 2px 8px;
		display: inline-block;
		border-radius: var(--corner);
		background-color: var(--color-1);
	}
	.desc {
		display: flex;
		text-align: right;
		flex-direction: column;
		justify-content: center;
	}
	.form .price,
	.form .cat {
		background: #b9b9b9;
	}
</style>
