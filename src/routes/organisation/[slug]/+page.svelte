<script>
	import Main from '$lib/blocks/Main.svelte';
	import Content from '$lib/blocks/Content.svelte';	
</script>

<div class="page">
	
	<Main>
		<Content>

			<div class="block">
				<h2>Overview</h2>
				<p>Place for overview data or graphics</p>
			</div>

			<div class="block">
				<h2>Contacts</h2>
				<p>Show last 10 members</p>
			</div>

			<div class="block">
				<h2>Events</h2>
				<p>Show last 3 events</p>
			</div>


		</Content>




	</Main>
</div>


<style>
	.block {
		background-color: white;
		margin-bottom: 30px;
		padding: 30px;	
		min-height: 300px;
	}

</style>