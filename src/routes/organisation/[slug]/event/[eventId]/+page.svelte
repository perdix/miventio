<script>
	import Header from '$lib/blocks/Header.svelte';
	import Content from '$lib/blocks/Content.svelte';
</script>

<Header title={'Gesamtübersicht'} />

<Content>
	<div class="row">

		<div class="md-6 col">

			<div>
				<h3>Anzahl der Anmeldungen</h3>
			</div>
			
		</div>
	
		<div class="md-6 col">
			<div>
				<h3>Ein Diagramm?</h3>
			</div>
		
		</div>
	
		<div class="md-12 col">
			<div>
				<h3>Die letzten 15 Anmeldungen</h3>
			</div>
		</div>
	
	</div>

</Content>







<style>
	.row {

	}
	.row > div {
		padding: 15px;
	}

	.row > div div{
		background-color: white;
		padding: 30px;
		min-height: 300px;
	}
</style>
