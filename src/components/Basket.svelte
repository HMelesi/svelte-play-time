<script>
    import { fetchBasket } from "../utils/api";
    import { onMount } from 'svelte';
    import { get } from "svelte/store";
    import { user } from "../store";
    import BasketItem from "./BasketItem.svelte";

    let items = [];
   
    onMount(async() => {
        user.subscribe(async(user) => {
            const apiItems = await fetchBasket(user.username)
            items = apiItems;
        });
    });

    function updateItems (newItems) {
        items = newItems;
    }
</script>

<div>
	<ul class="items_list">
        {#each items as item}
            <BasketItem basketItem={item} items={items} updateItems={updateItems}/>            
        {/each}
        </ul>
</div>

<style>
    .items_list {
        display: flex;
        flex-direction: column;
        align-items: center
    }
</style>