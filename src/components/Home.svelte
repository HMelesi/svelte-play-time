<script>
    import { fetchItems, fetchCategories } from "../utils/api";
    import { onMount } from 'svelte';
    import ShopItem from "./ShopItem.svelte";

    let shopItems = [];
    let categories = [];

    let selectedCategory;

    onMount(async() => {
        const apiItems = await fetchItems();
        shopItems = apiItems;

        const apiCategories = await fetchCategories();
        categories = apiCategories;
    });

    async function handleOnChange(event) {
        const { value } = event.target;
        selectedCategory = value;
        const apiItems = await fetchItems(selectedCategory);
        shopItems = apiItems;
    }

    function updateShopItems(newItems) {
        shopItems = newItems;
    }
</script>

<div>
    <label for="category">CATEGORY:</label>
      <select
        class="itemForm__input"
        id="category_name"
        name="category_name"
        value={selectedCategory}
        on:change={handleOnChange}
        required
      >
        <option defaultValue></option>
        {#each categories as category}
        <option key={category.category_name}>{category.category_name}</option>
        {/each}
        })}
      </select>
	<ul class="items_list">
        {#each shopItems as shopItem}
            <ShopItem shopItem={shopItem} shopItems={shopItems} updateShopItems={updateShopItems}/>
        {/each}
        </ul>
</div>

<style>
    .items_list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>