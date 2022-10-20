<script>
	export let name;
	import Home from "./Home.svelte";
	import IndividualItem from "./IndividualItem.svelte";
	import PostItem from "./PostItem.svelte";
	import Basket from "./Basket.svelte";
	import Header from "./Header.svelte";
	import { Router, Route, Link } from "svelte-navigator";
import Navbar from "./Navbar.svelte";
</script>

<main>
	<Header name={name} />
	<Router>
		<Navbar/>
		<Route path="add-item" component={PostItem}/>
		<Route path="items/:id" component={IndividualItem}/>
		<Route path="basket" component={Basket}/>
		<Route path="" component={Home}/>
	</Router>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-content: center;
	}


	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>