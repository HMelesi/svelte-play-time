import { writable } from "svelte/store";

/** Store for your data. 
This assumes the data you're pulling back will be an array.
If it's going to be an object, default this to an empty object.
**/
export const user = writable({
  username: "Paul-R",
  avatar_url: "https://example.com/Paul-R.jpg",
  kudos: 15,
  items_in_basket: 2,
  items_ordered: 1,
});

/** Data transformation.
For our use case, we only care about the drink names, not the other information.
Here, we'll create a derived store to hold the drink names.
**/
// export const drinkNames = derived(apiData, ($apiData) => {
//   if ($apiData.drinks){
//     return $apiData.drinks.map(drink => drink.strDrink);
//   }
//   return [];
// });
