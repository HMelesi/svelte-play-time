<script>
	import { Link } from "svelte-navigator";
    import {removeItemFromShop} from "../utils/api";

    export let shopItem;
    export let shopItems;
    export let updateShopItems;
    
    function convertPrice(number) {
        return `£${(number/100).toFixed(2)}`;
    }

    async function deleteItem() {
        const res = await removeItemFromShop(shopItem.item_id);
        if(res.status === 204) {
            const newItems = shopItems.filter((item) => item.item_id !== shopItem.item_id);
            updateShopItems(newItems);
        }
    }
</script>

<li class="items_list_item">
    <p>
    {shopItem.item_name}
    </p>
    <img class="items_list_item_image" src={shopItem.img_url} alt={shopItem.item_name}/>
    <p>{convertPrice(shopItem.price)}</p>
    <Link to={`items/${shopItem.item_id}`}>view</Link>
    <button on:click={deleteItem}>delete item</button>
</li>

<style>
.items_list_item {
    text-decoration: none;
    list-style:none;
    margin: 10px;
    width: 300px;
    margin: 30px 10px;
}
.items_list_item_image {
    object-fit: cover;
  width:230px;
  height:230px;
}
</style>