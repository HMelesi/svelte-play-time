<script>
    import { removeItemFromUserBasket } from "../utils/api";
    import { get } from "svelte/store";
    import { user } from "../store";

    export let basketItem;
    export let items;
    export let updateItems;

    function convertPrice(number) {
        return `£${(number/100).toFixed(2)}`;
    }

    async function removeItemFromBasket() {
        const currentUser = get(user);
        const res = await removeItemFromUserBasket(currentUser.username, basketItem.item_id);
        if (res.status === 204) {
            const newItems = items.filter((item) => item.item_id !== basketItem.item_id);
            updateItems(newItems);
        }
    }
</script>

<li class="items_list_item">
    <p>
    {basketItem.item_name}
    </p>
    <img class="items_list_item_image" src={basketItem.img_url} alt={basketItem.item_name}/>
    <p>{convertPrice(basketItem.price)}</p>
    <button on:click={removeItemFromBasket}>remove from basket</button>
</li>

<style>
.items_list_item {
    text-decoration: none;
    list-style:none;
    margin: 10px;
    width: 300px
}
.items_list_item_image {
    width: 80%;
}
</style>