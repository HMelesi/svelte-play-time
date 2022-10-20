<script>
    import { fetchItemById, addItemToUserBasket } from "../utils/api";
    import { onMount } from 'svelte';
    import { useParams } from "svelte-navigator";
    import { get } from "svelte/store";
    import { user } from "../store";

    const params = useParams();

    let item_id = $params.id;
    let item = {};

    onMount(async() => {
        const apiItem = await fetchItemById(item_id);
        item = apiItem;
    });

    function convertPrice(number) {
        return `£${(number/100).toFixed(2)}`;
    }

    async function addItemToBasket(){
        const currentUser = get(user);
        const apiItem = await addItemToUserBasket(currentUser.username, item_id);
        return apiItem;
    }
</script>

<div class="individual_item">
    <h2>{item.item_name}</h2>
    <p>{item.category_name}</p>
    <p>{convertPrice(item.price)}</p>
    <p>{item.description}</p>
    <button on:click={addItemToBasket}>Add to basket</button>
    <img  class="items_list_item_image" src={item.img_url}/>
</div>


<style>
.individual_item{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.items_list_item_image {
    max-width: 40%;
}
</style>
