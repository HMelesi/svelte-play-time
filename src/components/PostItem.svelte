<script>
    import {fetchCategories, addItemToSell} from "../utils/api"
    import { onMount } from 'svelte';
    import { navigate } from "svelte-navigator";

    let categories = [];
    let body = {
    item_name: "",
    description: "",
    img_url: "",
    price: 0,
    category_name: "",
  };
  let alert;

    function handleOnChange (event) {
    const { id, value } = event.target;

    let copyBody = Object.assign({}, body);

      if (id === "price") {
        const numberValue = parseInt(value);
        if (numberValue) {
          copyBody.price = numberValue;
        }
      } else {
        copyBody[id] = value;
      }
      body = copyBody;

  };

  async function handleOnSubmit (event) {
    event.preventDefault();

    const apiItem = await addItemToSell(body);
    
    if(apiItem) {
        navigate(`items/${apiItem.item_id}`, { replace: true })
    } else {
        alert = "something went wrong!";
        setTimeout(() => {
        alert = null;
      }, 2000);
    }
  };

    onMount(async() => {
        const apiCategories = await fetchCategories();
        categories = apiCategories;
    });
</script>


<div>
    <p>Fill out the details below to sell an item at the shop</p>
    <form class="itemForm" on:submit|preventDefault={handleOnSubmit}>
      <label for="item_name">ITEM NAME:</label>
      <input
        class="itemForm__input"
        required
        value={body.item_name}
        id="item_name"
        on:change={handleOnChange}
      />
      <label for="description">DESCRIPTION:</label>
      <input
        class="itemForm__input"
        required
        value={body.description}
        id="description"
        on:change={handleOnChange}
      />
      <label for="img_url">IMAGE URL:</label>
      <input
        class="itemForm__input"
        required
        value={body.img_url}
        id="img_url"
        on:change={handleOnChange}
      />
      <label for="price">PRICE:</label>
      <input
        class="itemForm__input"
        required
        value={body.price}
        id="price"
        on:change={handleOnChange}
      />
      <label for="category">CATEGORY:</label>
      <select
        class="itemForm__input"
        id="category_name"
        name="category_name"
        value={body.category_name}
        on:change={handleOnChange}
        required
      >
        <option defaultValue></option>
        {#each categories as category}
        <option key={category.category_name}>{category.category_name}</option>
        {/each}
        })}
      </select>
      <button class="secondaryButton">LIST ITEM</button>
      <div class="shopitems__container__item__message__space">
        <p>{#if alert}
            {alert}
        {/if}</p>
      </div>
    </form>
  </div>