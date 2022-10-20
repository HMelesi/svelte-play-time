import axios from "axios";

const marketApi = axios.create({
  baseURL: "https://nc-marketplace.herokuapp.com/api",
});

export const fetchItems = async (category_name) => {
  const res = await marketApi.get("/items", {
    params: {
      category_name,
    },
  });
  return res.data.items;
};

export const fetchItemById = async (item_id) => {
  const res = await marketApi.get(`/items/${item_id}`, {});
  return res.data.item;
};

export const fetchCategories = async () => {
  const res = await marketApi.get("/categories");
  return res.data.categories;
};

export const addItemToSell = async (body) => {
  const res = await marketApi.post("/items", body);
  return res.data.item;
};

export const fetchBasket = async (username) => {
  const res = await marketApi.get(`/users/${username}/basket`);
  return res.data.items;
};

export const addItemToUserBasket = async (username, item_id) => {
  const res = await marketApi.post(`/users/${username}/basket`, { item_id });
  return res.data.item;
};

export const removeItemFromUserBasket = async (username, item_id) => {
  return marketApi.delete(`/users/${username}/basket/${item_id}`);
};

export const removeItemFromShop = async (item_id) => {
  return marketApi.delete(`/items/${item_id}`);
};

export const fetchUsers = async () => {
  const res = await marketApi.get("/users");
  return res.data.users;
};

export const fetchUser = async (username) => {
  const res = await marketApi.get(`/users/${username}`);
  return res.data.user;
};
